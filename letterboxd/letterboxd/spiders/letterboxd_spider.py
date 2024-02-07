from pathlib import Path
import scrapy

class LetterboxdSpider(scrapy.Spider):
    name = 'letterboxd'

    def start_requests(self):
        username = 'jay'
        url = [f'https://letterboxd.com/{username}/films/']
        yield scrapy.Request(url=url[0], callback=self.parse)
    

    def parse(self, response):
        page = response.url.split("/")[-2]
        filename = f"user-{page}.html"
        Path(filename).write_bytes(response.body)
        self.log(f"Saved file {filename}")


        # # Extract film information from the page
        # film_titles = response.css('.poster-list .film-poster::attr(data-film-name)').getall()
        # film_years = response.css('.poster-list .film-poster::attr(data-film-release-year)').getall()

        # # Process the extracted data
        # for title, year in zip(film_titles, film_years):
        #     yield {
        #         'title': title,
        #         'year': year
        #     }

        # # Follow pagination links
        # next_page = response.css('.paginate-next::attr(href)').get()
        # if next_page is not None:
        #     yield response.follow(next_page, self.parse)