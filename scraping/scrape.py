import scrapy


class LetterboxdSpider(scrapy.Spider):
    name = 'letterboxd'
    
    def start_requests(self):
        username = input("Enter the username: ")
        url = f'https://letterboxd.com/{username}/films/'
        yield scrapy.Request(url=url, callback=self.parse)
    
    def parse(self, response):
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
                yield response.follow(next_page, self.parse)

# Run the spider with scrapy runspider scrape.py -o movies.json

