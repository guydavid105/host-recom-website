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
            # rating =
            
            yield {
                'title': title,
                # 'rating': rating
            }   