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


let cards = [
  {img: book1, title: "And Then There Were None", id: 1},
  {img: book2, title: "The Little Prince", id: 2},
  {img: book3, title: "The Tale of Peter Rabbit", id: 3},
  {img: book4, title: "Life after Life", id: 4},
  {img: book5, title: "Still Life", id: 5},
  {img: book6, title: "Introduction to Algorithms", id: 6}
];

let moviecards = [
  { id: 706083, type: "movie", title: "Wonka", img: "https://a.ltrbxd.com/resized/film-poster/7/0/6/0/8/3/706083-wonka-0-500-0-750-crop.jpg" },
  { id: 764890, type: "movie", title: "The Iron Claw", img: "https://a.ltrbxd.com/resized/film-poster/7/6/4/8/9/0/764890-the-iron-claw-2023-0-500-0-750-crop.jpg" }, 
  { id: 724394, type: "movie", title: "The Exorcist: Believer", img: "https://a.ltrbxd.com/resized/film-poster/7/2/4/3/9/4/724394-the-exorcist-believer-0-500-0-750-crop.jpg" }, 
  { id: 835774, type: "movie", title: "Saltburn", img: "https://a.ltrbxd.com/resized/film-poster/8/3/5/7/7/4/835774-saltburn-0-500-0-750-crop.jpg" }, 
  { id: 301552, type: "movie", title: "Ferrari", img: "https://a.ltrbxd.com/resized/film-poster/3/0/1/5/5/2/301552-ferrari-2023-0-500-0-750-crop.jpg" }, 
  { id: 503402, type: "movie", title: "Mission: Impossible – Dead Reckoning Part One", img: "https://a.ltrbxd.com/resized/film-poster/5/0/3/4/0/2/503402-mission-impossible-dead-reckoning-part-one-0-500-0-750-crop.jpg" }, 
  { id: 715856, type: "movie", title: "Beau Is Afraid", img: "https://a.ltrbxd.com/resized/film-poster/7/1/5/8/5/6/715856-beau-is-afraid-0-500-0-750-crop.jpg" }, 
  { id: 868491, type: "movie", title: "Air", img: "https://a.ltrbxd.com/resized/film-poster/8/6/8/4/9/1/868491-air-2023-0-500-0-750-crop.jpg" }, 
  { id: 721333, type: "movie", title: "Cocaine Bear", img: "https://a.ltrbxd.com/resized/film-poster/7/2/1/3/3/3/721333-cocaine-bear-0-500-0-750-crop.jpg" }, 
  { id: 558056, type: "movie", title: "Knock at the Cabin", img: "https://a.ltrbxd.com/resized/film-poster/5/5/8/0/5/6/558056-knock-at-the-cabin-0-500-0-750-crop.jpg" }, 
  { id: 465649, type: "movie", title: "M3GAN", img: "https://a.ltrbxd.com/resized/film-poster/4/6/5/6/4/9/465649-m3gan-0-500-0-750-crop.jpg" }, 
  { id: 63058, type: "movie", title: "Avatar: The Way of Water", img: "https://a.ltrbxd.com/resized/film-poster/6/3/0/5/8/63058-avatar-the-way-of-water-0-500-0-750-crop.jpg" }, 
  { id: 782545, type: "movie", title: "Sanctuary", img: "https://a.ltrbxd.com/resized/film-poster/7/8/2/5/4/5/782545-sanctuary-2022-0-500-0-750-crop.jpg" }, 
  { id: 908010, type: "movie", title: "How to Blow Up a Pipeline", img: "https://a.ltrbxd.com/resized/film-poster/9/0/8/0/1/0/908010-how-to-blow-up-a-pipeline-0-500-0-750-crop.jpg" }, 
  { id: 542001, type: "movie", title: "Bros", img: "https://a.ltrbxd.com/resized/film-poster/5/4/2/0/0/1/542001-bros-0-500-0-750-crop.jpg" }
];

const delay = 2500;

export function Slideshow() {
  if (localStorage.getItem('book')) {
    var book_data = JSON.parse(localStorage.getItem('book'));
    if (book_data != []) {
      cards = book_data;
    }
  }

  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === cards.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {cards.map((card, index) => (
          <div
            className="slide"
            key={index}
          >
            <img src={cards[index].img} alt="book" max-width="250px" height="100%"/>
            <p><b>{card.title}</b></p>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {cards.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}


export function SlideshowMovies() {
  if (localStorage.getItem('movie')) {
    var movie_data = JSON.parse(localStorage.getItem('movie'));
    if (movie_data != []) {
      moviecards = movie_data;
    }
  }

  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === moviecards.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {moviecards.map((card, index) => (
          <div
            className="slide"
            key={index}
          >
            <img src={moviecards[index].img} alt="movies" onerror="this.onerror=null; this.src='../../asset/book.jpg'" max-width="250px" height="100%" />
            <p><b>{card.title}</b></p>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {moviecards.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}