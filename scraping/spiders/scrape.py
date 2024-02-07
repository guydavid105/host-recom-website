import scrapy
from scrapy.crawler import CrawlerProcess


class LetterboxdSpider(scrapy.Spider):
    name = 'letterboxd'
    
    def __init__(self, username=None, *args, **kwargs):
        super(LetterboxdSpider, self).__init__(*args, **kwargs)
        self.username = username
    
    @staticmethod
    def start_requests():
        url = f'https://letterboxd.com/{LetterboxdSpider.username}/films/'
        yield scrapy.Request(url=url, callback=LetterboxdSpider.parse)
    
    @staticmethod
    def parse(response):
        movies = response.css('.poster-list .film-poster')
        
        for movie in movies:
            title = movie.css('.frame img::attr(alt)').get()
            year = movie.css('.frame .year::text').get()
            rating = movie.css('.frame .rating .rating-highest::text').get()
            
            yield {
                'title': title,
                'year': year,
                'rating': rating
            }
            next_page = response.css('.paginate-next::attr(href)').get()
            if next_page:
                yield response.follow(next_page, LetterboxdSpider.parse)


if __name__ == "__main__":
    username = input("Enter the username: ")
    process = CrawlerProcess(settings={
        'FEED_FORMAT': 'json',
        'FEED_URI': 'movies.json'
    })
    process.crawl(LetterboxdSpider, username=username)
    process.start()

