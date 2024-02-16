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
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists/";

export function Home() { 
    const [token, setToken] = useState("");
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
        alert("Login Spotify Success!");

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
            setData(response.data);
            console.log(response.data)
            // console.log(response.data["items"][0]["images"][0]["url"])
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
            <button onClick={handleGetPlaylists}>Get Playlists</button> <br></br>
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