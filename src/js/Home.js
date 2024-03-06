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

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?limit=50";
const USER_ENDPOINT = "https://api.spotify.com/v1/me/";


export function Home() { 
    const [token, setToken] = useState("no");
    const [data, setData] = useState({});
    const [username, setUsername] = useState();
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

    
    // useEffect(() => {
    //   if (data.length) {

    //     let songs = [{username: username}]
    //     // let songs = [{username: }]

    //     for (let i = 0; i < data.length; i++) {
    //       let rating = 5 - ((i / data.length) * 2.5);

    //       songs.push({
    //         title: data[i].name,
    //         uid: data[i].id,
    //         rating: String(rating)
    //       })
    //     }

    //     axios.post('https://incubo.serveo.net/api/v1/people/post-spotify', songs).then((response) => {
    //       console.log(response.data)
    //     })

    //     // let dataString = JSON.stringify(songs);
    //     // console.log(dataString)
    //     // Put dataString into API to call in python script.
    //   }
    // }, [data])

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
      axios
        .get(USER_ENDPOINT, { // Add a new endpoint
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
          setUsername(response.data["id"]); 
        })
        .catch((error) => {
          console.log(error);
        });


        // console.log(token);
        axios
          .get(PLAYLISTS_ENDPOINT, {
            headers: {
              Authorization:`Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data)
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
            
          <button 
          style={{ borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#dac1f5',
            borderRadius:10,
            padding: 10,
          }}
          onClick={handleGetPlaylists}> <HashLink to={{pathname:"/setup"}}> Login</HashLink></button>

          <button
          style= {{ borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#dac1f5',
            borderRadius:10,
            padding:10,
          }}
          > <HashLink to={{pathname:"./timeline"}}>Recommendation Timeline</HashLink></button>

        <div className="column">
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
            </center>

            <Footer />
        </>

      );
  }