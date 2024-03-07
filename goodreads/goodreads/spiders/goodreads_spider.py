import scrapy
import json

class GoodreadsSpider(scrapy.Spider):
    name = 'goodreads'
    
    def start_requests(self):
        username = getattr(self, 'username', None)
        if username is None:
            raise ValueError('No username provided. Please provide a username with the -a flag.')
        urls = [
            f"https://www.goodreads.com/review/list/{username}?shelf=read",
        ]
        
        # Init json with username
        filename = f'{username}_book_data.json'
        with open(filename, 'w') as file:
            json.dump([{"username" : username}], file)


        pagecount = 0
        
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse, cb_kwargs={'username': username, 'pagecount': pagecount})

    
    def parse(self, response, username, pagecount):
        # response = response.text
        # books = response.css('table').getall()[1]

        books = response.css('tbody tr')
        
        titles = []
        uids = []
        ratings = []
        imgs = []
        releases = []
        for book in books:
            titles.append(book.css('td.field.title a::attr(title)').get())
            link = book.css('td.field.title a::attr(href)').get()
            uids.append(link.replace('/book/show/', ''))
            rating = (book.css('td.field.rating span.staticStars::attr(title)').get())
            
            match rating:
                case 'did not like it':
                    rating = 1

                case 'it was ok':
                    rating = 2

                case 'liked it':
                    rating = 3

                case 'really liked it':
                    rating = 4

                case 'it was amazing':
                    rating = 5

                case _:
                    rating = None

            ratings.append(rating)

            imgs.append(book.css('td.field.cover img::attr(src)').get())
            # TODO: Can get a higher res one by going to the book page, but this will be left as an extension.

            try:
                releases.append(book.css('td.field.date_pub div.value::text').get().split()[2])
            except:
                releases.append(None)

        # load in JSON to update
        filename = f'{username}_book_data.json'
        with open(filename, 'r') as file:
            data = json.load(file)
        file.close()

        # Add extracted data to json
        for title, uid, rating, img, year in zip(titles, uids, ratings, imgs, releases):
            yield {
                'title': title,
                'uid': uid,
                'rating': rating,
                'img': img,
                'year': year,
            }
            data.append({'title': title, 'uid': uid, 'rating': rating, 'img': img, 'year': year})

        # Store the data back into the JSON file
        with open(filename, 'w') as file:
            json.dump(data, file)
        file.close()

        # Follow pagination links, and repeat
        if pagecount < 25:
            pagecount += 1
            next_page = response.css('a.next_page::attr(href)').get()
            if next_page is not None:
                yield response.follow(next_page, self.parse, cb_kwargs={'username': username, 'pagecount': pagecount})
