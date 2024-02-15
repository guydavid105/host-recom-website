# 1b_group_project
Group project to make a recommender system that works for books, movies and music.

## Scraping:
We are using Scrapy with Python to scrape letterboxd. This can be run using the following bash line:

``
python3 -m scrapy runspider ./letterboxd/letterboxd/spiders/letterboxd_spider.py -a username={username} -s LOG_ENABLED=False
``

This produces the JSON file {username}_film_data.json, which contains the film data for the user {username}.
