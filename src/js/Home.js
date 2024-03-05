import book from '../asset/book.jpg';
import music from '../asset/music.jpg';
import movie from '../asset/movie.jpg';
import music_mp3 from '../asset/audio/Town_of_Windmill.mp3';
import {Slideshow, SlideshowMovies} from './helper/slideShow';
import { HashLink } from 'react-router-hash-link';
import Footer from "./helper/Footer";
import {Top} from "./helper/Top";
import React, { useEffect, useState } from "react";
import HorizontalScroll from "./helper/horizontalScroll";
import axios from "axios";
// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists/";
// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists/";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term";
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
        const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
        console.log(currentValue);
        const [key, value] = currentValue.split("=");
        accumulator[key] = value;
        return accumulator;
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
    
        if(data.length===0){
          console.log(token_type);
          console.log(expires_in);
          alert("Login Spotify Success!");
        }
        if(localStorage.getItem("accessToken")){
            setToken(localStorage.getItem("accessToken"));
        }
      }
    });

    const handleGetPlaylists = () => {
        // console.log(token);
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

            {/* <img src={movie} alt="movie" height="80" ></img>
                <img src={book} alt="book" height="80" ></img>
                <img src={music} alt="music" height="80" ></img> */}
            
          <button 
          style={{ borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            width:50,
            height:25,
            backgroundColor:'#dac1f5',
            borderRadius:10,
          }}
          onClick={handleGetPlaylists}> <HashLink to={{pathname:"/setup"}}> Login</HashLink></button> 

        <div className="two-column-container">
          <div className="column">

          <button 
            style={{ borderWidth:1,
              alignItems:'center',
              justifyContent:'center',
              width:250,
              height:40,
              backgroundColor:'#dac1f5',
              borderRadius:100,
            }}
          onClick={handleGetPlaylists}> Login ☝️ <u>Import 👈</u> Spotify Data</button> 
            {/* <b><i>Your</i> Top Tracks</b>   */}
            <b><i>MUSIC 🎵</i> </b>  
             
            <div className='recommendation-box'>
            { data.length>0? (data.map((item, index) => (
              <div key={index} className='recommendation-item'>
              {/* Check if "artists" array exists and has at least one item */}
              {item.artists && item.artists.length > 0 && 
              (<div className="song-info">
                {item.album.images.length>0 &&(
               <img src={item.album.images[0].url} alt={item.name} className='album-image' height="15"></img>)}
              {/* <p className='song-name'>{item.name}</p> --- <p className='artist-name'><i>{item.artists[0].name}</i></p> */}
                <b>{item.name}</b> --- <i>{item.artists[0].name}</i>
              </div>
               )}
              </div>
            ))) : 
            
       
            <p className="no-data">
            See more after <b>Spotify Login</b> and <b>Import</b>. 
            
            </p>
            }
            </div>
            
          
           
            <br></br>
        </div>

        <div className="column">
          <b><i>BOOKS 📖</i> </b>  

            <Slideshow />


          </div>
        </div>

          
            <SlideshowMovies />
            
            {/* <HorizontalScroll /> */}

          
            {/* <h2>Try example subpage</h2> 
            <HashLink to="/example"><i>Example Subpage</i></HashLink> */}
           
            {/* <h2>Developer Notice Board</h2> 
            Change me from src/index.js <br/>
            Other subpages implemented at src/js/ <br/>
            Reference: <a href="https://reactjs.org">Learn React</a> <br/> */}
            </center>

            <Footer />
        </>

      );
  }