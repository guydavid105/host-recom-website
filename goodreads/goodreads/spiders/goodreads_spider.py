import scrapy

class GoodreadsSpider(scrapy.Spider):
    name = 'goodreads'
    
    def start_requests(self):
        username = getattr(self, 'username', None)
        if username is None:
            raise ValueError('No username provided. Please provide a username with the -a flag.')
        urls = [
            f"https://www.goodreads.com/review/list/{username}?shelf=read",
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    
    def parse(self, response):
        # response = response.text
        # books = response.css('table').getall()[1]

        books = response.css('tbody tr')
        
        for book in books:
            title = book.css('td.field.title a::attr(title)').get()
            link = book.css('td.field.title a::attr(href)').get()
            uid = link.replace('/book/show/', '')
            rating = book.css('td.field.rating span.staticStars::attr(title)').get()
            
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

            img = book.css('td.field.cover img::attr(src)').get()
            # TODO: Can get a higher res one by going to the book page, but this will be left as an extension.

            yield {
                'title': title,
                'uid': uid,
                # 'rating': rating
            }   