import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {Top} from "./helper/Top";
import Footer from "./helper/Footer";
import email from '../asset/login/email.png';
import password from '../asset/login/password.png';
import person from '../asset/login/person.png';
import letterboxd from '../asset/login/letterboxd.png';
import spotifyIcon from '../asset/login/Spotify.png';
import bookIcon from '../asset/login/books.png';
import Goodreads from '../asset/login/goodreads.png';
import axios from "axios";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?limit=50";
const USER_ENDPOINT = "https://api.spotify.com/v1/me/";

export function Setup(props)
{

    const [username, setUsername] = useState();
    const [data, setData] = useState();

    const [action,setAction] = useState("Login");
    const [val, setVal] = useState("Name");
    const handleChange = (event) => {
        // 👇 Get input value from "event"
        setVal(event.target.value);
    };

    useEffect(() => {
        if (!data && localStorage.getItem('accessToken')) {
            handleGetPlaylists();
        }
    })

    const handleGetPlaylists = () => {
        const token = localStorage.getItem('accessToken');

        axios
          .get(USER_ENDPOINT, { // Add a new endpoint
            headers: {
              Authorization:`Bearer ${token}`,
            },
          })
          .then((response) => {
            // console.log(response.data)
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
            //   console.log(response.data)
              setData(response.data["items"]); 
            })
            .catch((error) => {
              console.log(error);
            });
        };

    const clickHandler = ()=>{
        if (localStorage.getItem('book')) {
            localStorage.removeItem('book');
        }
        if (localStorage.getItem('movie')) {
            localStorage.removeItem('movie');
        }
        if (localStorage.getItem('song')) {
            localStorage.removeItem('song');
        }

        const letterboxd = document.getElementById('letterboxd-id').value;
        const goodreads = document.getElementById('goodreads-id').value;
        console.log(letterboxd, goodreads);
        if(letterboxd==='' && goodreads===''){
            alert("Please fill in the information");
        }
        else{
            if(goodreads !== ''){
                var url = `https://incubo.serveo.net/api/v1/people/find-by-goodreads-id/${goodreads}`;
            }
            else {
                var url = `https://incubo.serveo.net/api/v1/people/find-by-letterboxd-id/${letterboxd}`;
            }

            const user_data = async () => {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                if (data.length === 0) {
                    alert("User not found!");
                    window.location = `/`;
                }
                return data;
            };
            async function recommendations(){
                const data = await user_data();
                const user_id = data[0].user_id;

                const book_url = `https://incubo.serveo.net/api/v1/people/recomm/book/${user_id}`;
                const book_response = await fetch(book_url);
                const book_data = await book_response.json();
                console.log(book_data);

                const movie_url = `https://incubo.serveo.net/api/v1/people/recomm/movie/${user_id}`;
                const movie_response = await fetch(movie_url);
                const movie_data = await movie_response.json();
                console.log(movie_data);

                const song_url = `https://incubo.serveo.net/api/v1/people/recomm/song/${user_id}`;
                const song_response = await fetch(song_url);
                const song_data = await song_response.json();
                console.log(song_data);

                if (book_data.length != 0) {
                    localStorage.setItem('book', JSON.stringify(book_data));
                }

                if (movie_data.length != 0) {
                    localStorage.setItem('movie', JSON.stringify(movie_data));
                }

                if (song_data.length != 0) {
                    localStorage.setItem('song', JSON.stringify(song_data));
                }

                alert("Login Success!");
                window.location = `/`;
            };
            recommendations();
        }
    }

    const clickHandlerToHome = ()=>{
        window.location = `/`;
    }

    useEffect(() => {
      if (data) {

        let songs = [{username: username}]
        // let songs = [{username: }]

        for (let i = 0; i < data.length; i++) {
          let rating = 5 - ((i / data.length) * 2.5);

          songs.push({
            title: data[i].name,
            uid: data[i].id,
            img: data[i]["album"]["images"][0]["url"],
            rating: String(rating)
          })
        }

        // Sends data to Guy's API, which passes into a python script
        axios.post('https://incubo.serveo.net/api/v1/people/post-spotify', songs).then((response) => {
          console.log(response.data)
        })

        // let dataString = JSON.stringify(songs);
        // console.log(dataString)
        // Put dataString into API to call in python script.
      }
    }, [data])

    const CLIENT_ID = "1d2d560c83a3419e8a003dd39460ec75";
    const SPOTIFY_AUTHORIZE_ENDPOINT="https://accounts.spotify.com/authorize";
    const REDIRECT_URL = "http://localhost:3000";
    // const REDIRECT_URL = "https://peter2024h.github.io/";
    const SPACE_DELIMITER = "%20";
    const SCOPES = ["user-read-currently-playing","user-read-playback-state","user-top-read", "user-read-recently-played"];
    const SCOPES_URL = SCOPES.join(SPACE_DELIMITER);
    const handleSpotify = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL}&response_type=token&show_dialog=true`;
    }

    return(
        <>
        <Top />
        <center>
            <br/>
            <div className='container'>
                <div className='header'>
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                {/* Option to choose from  */}
                <div className="submit-container">
                    <div className={action==='Login'?"submit":"submit gray"}
                    onClick={()=>{setAction("Login")}}>Login</div> 
                    <div className="submit gray" onClick={handleSpotify}> 
                        <img src={spotifyIcon} height="30" width="90" ></img>
                    </div>    
                    <div className={action==='Sign Up'?"submit":"submit gray"}
                    onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                </div>
                {/* IO */}

                Please make sure you are already signed in to Spotify.
                <div className="inputs">
                    <div className="input">
                        <img src={letterboxd} alt="letterboxd" height="8" width="21"></img>
                        <input type="Letterboxd" placeholder="Letterboxd" id="letterboxd-id"></input>
                    </div>
                    <div className="input">
                        <img src={Goodreads} alt="Goodreads" height="20" width="21" ></img>
                        <input type="Books" placeholder="Goodreads" id="goodreads-id"></input>
                    </div>
                </div>
                {/* Submit */}
                <div className="home-container">
                    <div className={"home"} onClick={clickHandler}> 
                        Submit
                    </div>
                    <div className={"home"} onClick={clickHandlerToHome}> 
                        Home
                    </div>
                </div>

            
            </div>
        </center>
        <Footer />
    </>
    )
}