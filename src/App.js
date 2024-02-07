import './App.css';
import book from './asset/book.jpg';
import music from './asset/music.jpg';
import movie from './asset/movie.jpg';

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
        Change me in src/App.js <br/>
        Reference: <a href="https://reactjs.org">Learn React</a> <br/>

      </header>
       
    </div>
  );
}

export default App;
