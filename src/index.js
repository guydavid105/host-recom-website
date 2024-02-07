import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './App.css';
import book from './asset/book.jpg';
import music from './asset/music.jpg';
import movie from './asset/movie.jpg';

const root = ReactDOM.createRoot(document.getElementById('root'));


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        Movies x Books x Music Recommendation System!
        </p>
       
        <img src={book} alt="book" height="200" ></img>
        <img src={music} alt="music" height="180" ></img>
        <img src={movie} alt="movie" height="160" ></img>

        Dev Notice: 
        Change me from src/index.js <br/>
        Reference: <a href="https://reactjs.org">Learn React</a> <br/>

      </header>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <App />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
