import book from '../asset/book.jpg';
import music from '../asset/music.jpg';
import movie from '../asset/movie.jpg';
import music_mp3 from '../asset/audio/Town_of_Windmill.mp3';
import { HashLink } from 'react-router-hash-link';

export function Home() { 
    return (
        <>
            <center>
            <h1>
            Movies x Books x Music Recommendation System!
            </h1>
            <i>Trust me, we are the best~</i> 
            <br/> <br/> <br/> <br/> <br/>
    
                <img src={book} alt="book" height="200" ></img>
                <img src={music} alt="music" height="180" ></img>
                <img src={movie} alt="movie" height="160" ></img>
            <br/> <br/> <br/> <br/> <br/>
            Example audio:
            <audio src={music_mp3} autoplay="autoplay" controls loop="loop"></audio><br/>

            Try example page: 
            
            <HashLink to="/example">🥇<i>Example Page</i></HashLink>
            
            <br/> <br/> <br/> <br/> <br/>
    
            Dev Notice: 
            Change me from src/index.js <br/>
            Reference: <a href="https://reactjs.org">Learn React</a> <br/>
            </center>

        </>

      );
  }