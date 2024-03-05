# 1b_group_project

Group project to make a recommender system that works for books, movies and music.

Peter_7Feb_React
Movies 📽 x Books 📖 x Music 🎵

## React Website

For the first time set up,

```
npm install
```

To run it locally,

```
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

See more at [React.md](./doc/React.md)

![Website Gallery View](./doc/photo/Website-v1.png)

## Scraping:

### Letterboxd:
We are using Scrapy with Python to scrape letterboxd. This can be run using the following bash line:

``
python3 -m scrapy runspider ./letterboxd/letterboxd/spiders/letterboxd_spider.py -a username={username} -s LOG_ENABLED=False
``

This produces the JSON file {username}_film_data.json, which contains the film data for the user {username}.

### Goodreads:
Again, we are using Scrapy. This can be run with the following:

``
python3 -m scrapy runspider ./goodreads/goodreads/spiders/goodreads_spider.py -a username={username} -s LOG_ENABLED=False
``

