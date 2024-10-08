import scrapy
import json
import time

class LetterboxdSpider(scrapy.Spider):
    name = 'letterboxd'

    def start_requests(self):
        # Get the username from the arguments
        username = getattr(self, 'username', None)
        if username is None:
            raise ValueError('No username provided. Please provide a username with the -a flag.')
        
        url = [f'https://letterboxd.com/{username}/films/']

        pagecount = 0
        
        # Init json with username
        filename = f'{username}_film_data.json'
        with open(filename, 'w') as file:
            json.dump([{"username" : username}], file)
        yield scrapy.Request(url=url[0], callback=self.parse, cb_kwargs={'username': username, 'pagecount': pagecount})
    

    def parse(self, response, username, pagecount):
        """
        Parse the response from the website and extract film information.

        Args:
            response (scrapy.http.Response): The response object from the website.

        Yields:
            dict: A dictionary containing the film information for the user.
            json: A json file containing the film information for the user.
        """
        # Extract film information from the page:
        films = response.css('li.poster-container')

        # Initialise lists to store the extracted data
        film_titles = []
        film_uids = []
        film_ratings = []
        film_imgs = []
        film_slugs = []

        for film in films:
            # Get film title from the alt text of the poster image
            film_titles.append(film.css('div.film-poster img::attr(alt)').get())

            # Get film UID from the data-film-id attribute of the poster
            film_uid = film.css('div.film-poster::attr(data-film-id)').get()
            film_uids.append(film_uid)

            # Get film slug from the data-film-slug attribute of the poster
            film_slug = film.css('div.film-poster::attr(data-film-slug)').get()
            film_slugs.append(film_slug)

            # Construct the url using the film_uid and film_slug (cursed URL construction, but it works (only sometimes...))
            img_URL = 'https://a.ltrbxd.com/resized/film-poster/'
            for char in film_uid:
                img_URL = img_URL + char + '/'
            img_URL = img_URL + film_uid + '-' + film_slug + '-0-230-0-345-crop.jpg' # NOTE: this hard codes resolution at most common (230x345)
            film_imgs.append(img_URL)

            # Calculate the film rating from the number of stars in the poster viewingdata
            film_rating = film.css('p.poster-viewingdata span.rating::text').get()
            if film_rating:
                rating = 0
                for char in film_rating:
                    if char == "★":
                        rating += 1
                    elif char == "½":
                        rating += 0.5
                    else:
                        print(f"error: rating not recognized. \n {char}")
                film_ratings.append(rating)
            else:
                film_ratings.append('')

        # load in JSON to update
        filename = f'{username}_film_data.json'
        with open(filename, 'r') as file:
            data = json.load(file)
        file.close()

        # Add extracted data to json
        for title, film_uid, film_rating, film_slug, film_img in zip(film_titles, film_uids, film_ratings, film_slugs, film_imgs):
            yield {
                'title': title,
                'uid': film_uid,
                'rating': film_rating,
                'slug': film_slug,
                'img': film_img
            }
            data.append({'title': title, 'uid': film_uid, 'rating': film_rating, 'slug': film_slug, 'img': film_img})

        # Store the data into the JSON file
        with open(filename, 'w') as file:
            json.dump(data, file)
        file.close()

        # Follow pagination links, and repeat
        next_page = response.css('li.paginate-current + li a::attr(href)').get()
        if ((next_page is not None) and pagecount < 8):
            yield response.follow(next_page, self.parse, cb_kwargs={'username': username, 'pagecount': pagecount})
        else:
            # load in JSON to update
            filename = f'{username}_film_data.json'
            with open(filename, 'r') as file:
                data = json.load(file)
            file.close()

            slug_years = {}
            slugs = []
            count = 0
            for film in data:
                try:
                    slug = film['slug']
                    slugs.append(slug)
                    yield scrapy.Request(url=f'https://letterboxd.com/film/{slug}', callback=self.parse_film, cb_kwargs={'slug': slug, 'years': slug_years})
                    count += 1
                except(KeyError):
                    # Is the username. 
                    try:
                        username = film['username']
                    except Exception as e:
                        raise e

            # I know this code is horrific, but can't think of a better bodge for now... sry guys.
            # One race condition, and we're loopin'. Add timeout to fix this.
            timeout = time.time() + 240 # 4 mins lol
            while len(slug_years) < count:
                if time.time() > timeout:
                    print("Timeout error: Not all films have been parsed.")
                    break
                else:
                    yield
                
            for film in data:
                try:
                    slug = film['slug']
                    film['year'] = slug_years[slug]
                except(KeyError):
                    pass
                    
            # Store the data into the JSON file
            with open(filename, 'w') as file:
                json.dump(data, file)
            file.close()
            

    def parse_film(self, response, slug, years):
        """
        Parse the response from the website and extract film information.
        
        Args:
            response (scrapy.http.Response): The response object from the website.
            slug (str): The slug of the film.
            years (dict): The dictionary to store the film years.
        
        Yields:
            dict: A dictionary containing the film information for the user.
            json: A json file containing the film information for the user.
        """

        film_year = response.css('small.number a::text').get()

        years.update({slug: film_year})
