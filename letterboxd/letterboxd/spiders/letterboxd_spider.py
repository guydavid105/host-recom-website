from pathlib import Path
import scrapy
import json
import os 

class LetterboxdSpider(scrapy.Spider):
    name = 'letterboxd'

    def start_requests(self):
        username = 'jay'
        url = [f'https://letterboxd.com/{username}/films/']
        # Init json
        filename = 'film_data.json'
        with open(filename, 'w') as file:
            json.dump([], file)
        yield scrapy.Request(url=url[0], callback=self.parse)
    

    def parse(self, response):
        # Extract film information from the page:

        # Films
        films = response.css('li.poster-container')
        film_titles = []
        film_uids = []
        for film in films:
            film_titles.append(film.css('div.film-poster img::attr(alt)').get())
            film_uids.append(film.css('div.film-poster::attr(data-film-id)').get())

        # load in JSON to update
        filename = 'film_data.json'
        with open(filename, 'r') as file:
            data = json.load(file) # Should get an empty list, or list of dicts
        file.close()
        # Process the extracted data
        for title, film_uid in zip(film_titles, film_uids):
            yield {
                'title': title,
                'uid': film_uid,
            }
            data.append({'title': title, 'uid': film_uid})

        # Store the data into the JSON file
        with open(filename, 'w') as file:
            json.dump(data, file)
        file.close()

        # Follow pagination links
        next_page = response.css('li.paginate-current + li a::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)
