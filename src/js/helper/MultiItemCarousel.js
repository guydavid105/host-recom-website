import React from 'react';

import book from '../../asset/book.jpg';
import music from '../../asset/music.jpg';
import movie from '../../asset/movie.jpg';
import book1 from '../../asset/books/and_then_there_were_none.jpg';
import book2 from '../../asset/books/TheLittlePrince.jpg';
import book3 from '../../asset/books/TheTaleofPeterRabbit.jpg';
import book4 from '../../asset/books/Life_After_Life.jpg';
import book5 from '../../asset/books/still-life.png';
import book6 from '../../asset/books/IntroToAlgo.jpg';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

let bookcards = [
  {img: book1, title: "And Then There Were None", id: 1},
  {img: book2, title: "The Little Prince", id: 2},
  {img: book3, title: "The Tale of Peter Rabbit", id: 3},
  {img: book4, title: "Life after Life", id: 4},
  {img: book5, title: "Still Life", id: 5},
  {img: book6, title: "Introduction to Algorithms", id: 6}
];

let musiccards = [
    {img: "https://i.scdn.co/image/ab67616d0000b273e5736e58acf1f0a365fbeabd", title: "Stars and the Moon", id:1},
    {img: "https://i.scdn.co/image/ab67616d0000b2736c582022e90b11f0da287a9a", title: "It's Not Living (If It's Not With You)", id: 2},
    {img: "https://i.scdn.co/image/ab67616d0000b2732c8b15493b4ea185c364e495", title: "Guys", id: 3},
    {img: "https://i.scdn.co/image/ab67616d0000b273592889d4d323785856f18770", title: "Fallingforyou", id: 4},
    {img: "https://i.scdn.co/image/ab67616d0000b273636b5f841e42fc5559bfabfd", title: "Older", id: 5},
    {img: "https://i.scdn.co/image/ab67616d0000b2731f44db452a68e229650a302c", title: "About You", id: 6}
];

let moviecards = [
  { id: 706083, type: "movie", title: "Wonka", img: "https://a.ltrbxd.com/resized/film-poster/7/0/6/0/8/3/706083-wonka-0-500-0-750-crop.jpg" },
  { id: 724394, type: "movie", title: "The Exorcist: Believer", img: "https://a.ltrbxd.com/resized/film-poster/7/2/4/3/9/4/724394-the-exorcist-believer-0-500-0-750-crop.jpg" },
  { id: 835774, type: "movie", title: "Saltburn", img: "https://a.ltrbxd.com/resized/film-poster/8/3/5/7/7/4/835774-saltburn-0-500-0-750-crop.jpg" },
  { id: 503402, type: "movie", title: "Mission: Impossible – Dead Reckoning Part One", img: "https://a.ltrbxd.com/resized/film-poster/5/0/3/4/0/2/503402-mission-impossible-dead-reckoning-part-one-0-500-0-750-crop.jpg" },
  { id: 715856, type: "movie", title: "Beau Is Afraid", img: "https://a.ltrbxd.com/resized/film-poster/7/1/5/8/5/6/715856-beau-is-afraid-0-500-0-750-crop.jpg" },
  { id: 721333, type: "movie", title: "Cocaine Bear", img: "https://a.ltrbxd.com/resized/film-poster/7/2/1/3/3/3/721333-cocaine-bear-0-500-0-750-crop.jpg" },
  { id: 558056, type: "movie", title: "Knock at the Cabin", img: "https://a.ltrbxd.com/resized/film-poster/5/5/8/0/5/6/558056-knock-at-the-cabin-0-500-0-750-crop.jpg" },
  { id: 465649, type: "movie", title: "M3GAN", img: "https://a.ltrbxd.com/resized/film-poster/4/6/5/6/4/9/465649-m3gan-0-500-0-750-crop.jpg" },
  { id: 63058, type: "movie", title: "Avatar: The Way of Water", img: "https://a.ltrbxd.com/resized/film-poster/6/3/0/5/8/63058-avatar-the-way-of-water-0-500-0-750-crop.jpg" },
  { id: 908010, type: "movie", title: "How to Blow Up a Pipeline", img: "https://a.ltrbxd.com/resized/film-poster/9/0/8/0/1/0/908010-how-to-blow-up-a-pipeline-0-500-0-750-crop.jpg" },
  { id: 542001, type: "movie", title: "Bros", img: "https://a.ltrbxd.com/resized/film-poster/5/4/2/0/0/1/542001-bros-0-500-0-750-crop.jpg" }
];


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisibilityGutter: 40 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export function MovieCarousel() {
    if (localStorage.getItem('movie')) {
        var movie_data = JSON.parse(localStorage.getItem('movie'));
        if (movie_data != []) {
          moviecards = movie_data;
        }
    }
    return (
        <>
        <div className="parent">
            <Carousel
                additionalTransform={0}
                arrows
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={3000}
                className=""
                swipeable={true}
                draggable={true}
                showDots={false}
                infinite={true}
                keyBoardControl
                pauseOnHover
                partialVisible={true}
            >
                {moviecards.map((card, index) => {
                    return (
                        <div className="slider" key={index}>
                            <img src={card.img} alt="movies" onerror="this.onerror=null; this.src='../../asset/book.jpg'" width="100%" max-height="80%" />
                            <p><b>{card.title}</b></p>
                        </div>
                    );
                })}
            </Carousel>
        </div>
        </>
    );
};

export function BookCarousel() {
    if (localStorage.getItem('book')) {
        var book_data = JSON.parse(localStorage.getItem('book'));
        if (book_data != []) {
          bookcards = book_data;
        }
    }
    return (
        <>
        <div className="parent">
            <Carousel
                additionalTransform={0}
                arrows
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={3000}
                className=""
                swipeable={true}
                draggable={true}
                showDots={false}
                infinite={true}
                keyBoardControl
                pauseOnHover
                partialVisible={true}
            >
                {bookcards.map((card, index) => {
                    return (
                        <div className="slider" key={index}>
                            <img src={card.img} alt="book" width="100%" max-height="100%"/>
                            <p><b>{card.title}</b></p>
                        </div>
                    );
                })}
            </Carousel>
        </div>
        </>
    );
};

export function MusicCarousel() {
    if (localStorage.getItem('music')) {
        var music_data = JSON.parse(localStorage.getItem('music'));
        if (music_data != []) {
          musiccards = music_data;
        }
    }
    return (
        <>
        <div className="parent">
            <Carousel
                additionalTransform={0}
                arrows
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={3000}
                className=""
                swipeable={true}
                draggable={true}
                showDots={false}
                infinite={true}
                keyBoardControl
                pauseOnHover
                partialVisible={true}
            >
                {musiccards
                .map((card, index) => {
                    return (
                        <div className="slider" key={index}>
                            <img src={card.img} alt="music" width="100%" max-height="100%"/>
                            <p><b>{card.title}</b></p>
                        </div>
                    );
                })}
            </Carousel>
        </div>
        </>
    );
};