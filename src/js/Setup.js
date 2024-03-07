import React, { useEffect, useState } from "react";
import {Top} from "./helper/Top";
import Footer from "./helper/Footer";
import letterboxd from '../asset/login/letterboxd.png';
import spotifyIcon from '../asset/login/Spotify.png';
import spotifyTick2 from '../asset/login/spotifyTick2-cropped.png';
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
    const [icon, setIcon] = useState(spotifyIcon);
    const [thinking, setThinking] = useState(false);


    useEffect(() => {
        if (!data && localStorage.getItem('accessToken')) {
            if (localStorage.getItem('expiresIn') > new Date().getTime()) {
                setIcon(spotifyTick2);  
            }
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
            setUsername(response.data["id"]); 
          })
          .catch((error) => {
            console.log(error);
          });
  
  
          axios
            .get(PLAYLISTS_ENDPOINT, {
              headers: {
                Authorization:`Bearer ${token}`,
              },
            })
            .then((response) => {
              setData(response.data["items"]); 
            })
            .catch((error) => {
              console.log(error);
            });
        };

    const clickHandler = () => {
        if (action === 'Login') {
            loginClick();
        } else {
            signupClick();
        }
    }

    const signupClick = () => {
        if(!thinking){

            let letterboxd = document.getElementById('letterboxd-id').value;
            let goodreads = document.getElementById('goodreads-id').value;
            const spotify = username;

            let songs = [];
            if (spotify && data){
                songs = [{username: username}]
        
                for (let i = 0; i < data.length; i++) {
                    let rating = 5 - ((i / (data.length - 1)) * 2.5);
            
                    songs.push({
                        title: data[i].name,
                        uid: data[i].id,
                        year: data[i]["album"]["release_date"].split("-")[0],
                        img: data[i]["album"]["images"][0]["url"],
                        rating: String(rating)
                    })
                }
            } 
            
            if (goodreads === '') {
                goodreads = '-'
            }
            if (letterboxd === '') {
                letterboxd = '-'
            }

            try {
                setThinking(true);
                alert("Collecting data... Please wait!");
                // Sends data to Guy's API, which passes into a python script
                axios.post(`https://incubo.serveo.net/api/v1/people/post-spotify/${goodreads}/${letterboxd}`, songs).then((response) => {
                    setThinking(false);
                    loginClick();
                });
            } catch (error) {
                setThinking(false);
                console.error(error);
            }
        }
        else{
            alert("Please wait for the data to be collected!");
        }
    }


    const loginClick = () => {
        if (!thinking){
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
            const spotify = username;

            // console.log(letterboxd, goodreads);
            if(!spotify && letterboxd==='' && goodreads===''){
                alert("Please fill in the information");
            }
            else{
                alert("Signing you in!");
                try {
                    if(goodreads !== ''){
                        var url = `https://incubo.serveo.net/api/v1/people/find-by-goodreads-id/${goodreads}`;
                    }
                    else if (spotify){
                        var url = `https://incubo.serveo.net/api/v1/people/find-by-spotify-id/${spotify}`;
                    }
                    else {
                        var url = `https://incubo.serveo.net/api/v1/people/find-by-letterboxd-id/${letterboxd}`;
                    }
                } catch (error) {
                    console.error(error);
                }

                const user_data = async () => {
                    const response = await fetch(url);
                    const data = await response.json();
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
                    // console.log(book_data);

                    const movie_url = `https://incubo.serveo.net/api/v1/people/recomm/movie/${user_id}`;
                    const movie_response = await fetch(movie_url);
                    const movie_data = await movie_response.json();
                    // console.log(movie_data);

                    const song_url = `https://incubo.serveo.net/api/v1/people/recomm/song/${user_id}`;
                    const song_response = await fetch(song_url);
                    const song_data = await song_response.json();
                    // console.log(song_data);

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
        else {
            alert("Please wait for your account to be created!");
        }
    }

    const clickHandlerToHome = ()=>{
        window.location = `/`;
    }


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
                <div className="submit-container">
                    <div className={action==='Login'?"submit":"submit gray"}
                    onClick={()=>{setAction("Login")}}>Login</div> 
                    <div className="submit gray" onClick={handleSpotify}> 
                        <img src={icon} height="30" width="90" ></img>
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