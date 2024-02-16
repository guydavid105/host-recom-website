import book from '../asset/book.jpg';
import music from '../asset/music.jpg';
import movie from '../asset/movie.jpg';
import music_mp3 from '../asset/audio/Town_of_Windmill.mp3';
import {Slideshow} from './helper/slideShow';
import { HashLink } from 'react-router-hash-link';
import Footer from "./helper/Footer";
import {Top} from "./helper/Top";
import React, { useEffect, useState } from "react";
import HorizontalScroll from "./helper/horizontalScroll";
import axios from "axios";
// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists/";
// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists/";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term";
// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing/";





export function Home() { 
    const [token, setToken] = useState("no");
    const [data, setData] = useState({});
    /* 
    http://localhost:3000/webapp#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
    */

    const getReturnedParamsFromSpotifyAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        console.log(currentValue);
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
        }, {});
    
        return paramsSplitUp;
    };
    

    useEffect(() => {
      if (window.location.hash) {
        const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
        localStorage.clear();
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);
 
        console.log(localStorage.getItem("accessToken"));
        console.log(token_type);
        console.log(expires_in);
        if(data.length===0){
          alert("Login Spotify Success!");
        }
        if(localStorage.getItem("accessToken")){
            setToken(localStorage.getItem("accessToken"));
        }
      }
    });

    const handleGetPlaylists = () => {
        console.log(token);
        axios
          .get(PLAYLISTS_ENDPOINT, {
            headers: {
              Authorization:`Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data)
            // playlist
            // console.log(response.data["items"][0]["images"][0]["url"])
            // top tracks
            // console.log(response.data["items"].length)
            // console.log(response.data["items"][0])
            // console.log(response.data["items"][0]["artists"][0]["name"])
            // console.log(response.data["items"][0]["name"])
            setData(response.data["items"]); 
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
    return (
        <>
            <center>
            <Top />
            <br/>

                {/* <img src={movie} alt="movie" height="80" ></img>
                <img src={book} alt="book" height="80" ></img>
                <img src={music} alt="music" height="80" ></img> */}
            <>
              <b>Your Top Tracks: </b> <br/>
             
            <div className='recommendation-box'>
            { data.length>0? (data.map((item, index) => (
              <div key={index} className='recommendation-item'>
              {/* Check if "artists" array exists and has at least one item */}
              {item.artists && item.artists.length > 0 && 
              (<div className="song-info">
               <img src={item.album.images[0].url} alt={item.name} className='album-image' height="15"></img>
              {/* <p className='song-name'>{item.name}</p> --- <p className='artist-name'><i>{item.artists[0].name}</i></p> */}
                <b>{item.name}</b> --- <i>{item.artists[0].name}</i>
              </div>
               )}
              </div>
            ))) : 
            <p className="no-data">No data available before login and import.</p>
            }
            </div>
            <button onClick={handleGetPlaylists}>Import Spotify Data</button> <br></br>

           

            {/* <img src={data["items"][0]["images"][0]["url"]}></img>  */}
            {/* <img src={data["items"][0]["images"][1]["url"]}></img>  */}

            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            </>

            <Slideshow />

            <HorizontalScroll />

            <h2>Example audio</h2>
            <audio src={music_mp3} autoplay="autoplay" controls loop="loop"></audio>

            <h2>Try example subpage</h2> 
            <HashLink to="/example"><i>Example Subpage</i></HashLink>
           
            <h2>Developer Notice Board</h2> 
            Change me from src/index.js <br/>
            Other subpages implemented at src/js/ <br/>
            Reference: <a href="https://reactjs.org">Learn React</a> <br/>
            </center>

            <Footer />
        </>

      );
  }