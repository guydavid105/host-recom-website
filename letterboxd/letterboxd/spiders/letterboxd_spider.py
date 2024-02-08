from pathlib import Path
import scrapy

class LetterboxdSpider(scrapy.Spider):
    name = 'letterboxd'

    def start_requests(self):
        username = 'jay'
        url = [f'https://letterboxd.com/{username}/films/']
        yield scrapy.Request(url=url[0], callback=self.parse)
    

    def parse(self, response):
        # Extract film information from the page:

        # Film titles
        film_titles = response.css('div.film-poster img::attr(alt)').getall()


        # Process the extracted data
        data = []
        for title in film_titles:
            yield {
                'title': title,
            }
            data.append({'title': title})

        # Follow pagination links
        next_page = response.css('li.paginate-current + li a::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)