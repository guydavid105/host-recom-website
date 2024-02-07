import book from '../asset/book.jpg';
import music from '../asset/music.jpg';
import movie from '../asset/movie.jpg';
import music_mp3 from '../asset/audio/Town_of_Windmill.mp3';
import {Slideshow} from './helper/slideShow';
import { HashLink } from 'react-router-hash-link';
import Blog_Footer from "./helper/blog_footer";

export function Home() { 
    return (
        <>
            <center>
            <h1>
            Movies x Books x Music Recommendation System!
            </h1>
            <i>Trust me, we are <b>the Best!</b> 🥇</i> 
            <br/>
                <img src={movie} alt="movie" height="80" ></img>
                <img src={book} alt="book" height="80" ></img>
                <img src={music} alt="music" height="80" ></img>
            <h2>Example audio</h2>
            <audio src={music_mp3} autoplay="autoplay" controls loop="loop"></audio><br/>

            <h2>Try example subpage</h2> 
            
            <HashLink to="/example"><i>Example Subpage</i></HashLink>
            <br/>
            <Slideshow />
            <h2>Developer Notice Board</h2> 
            Change me from src/index.js <br/>
            Other subpages implemented at src/js/ <br/>
            Reference: <a href="https://reactjs.org">Learn React</a> <br/>
            </center>

            <Blog_Footer />
        </>

      );
  }