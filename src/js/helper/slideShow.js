import React from 'react';

import book from '../../asset/book.jpg';
import music from '../../asset/music.jpg';
import movie from '../../asset/movie.jpg';
import book1 from '../../asset/books/and_then_there_were_none.jpg';
import book2 from '../../asset/books/TheLittlePrince.jpg';
import book3 from '../../asset/books/TheTaleofPeterRabbit.jpg';
import book4 from '../../asset/books/Life_After_Life.jpg';


const pics = [book1, book2, book3, book4];
// const title = ["Movie", "Book", "Music"];

const cards = [
  {
    img: "asset/book.jpg",
    title: "And Then There Were None",
    id: 1,
  },
  {
    img: "asset/movie.jpg",
    title: "The Little Prince",
    id: 2,
  },
  {
    img: "asset/music.jpg",
    title: "The Tale of Peter Rabbit",
    id: 3,
  },
  {
    img: "asset/book.jpg",
    title: "Life after Life",
    id: 4,
  }
];



const delay = 2500;

export function Slideshow() {
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
            <img src={pics[index]} alt="book" max-width="250px" height="100%"/>
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