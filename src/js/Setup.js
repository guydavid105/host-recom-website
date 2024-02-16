import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {Top} from "./helper/Top";
import Footer from "./helper/Footer";
import email from '../asset/login/email.png';
import password from '../asset/login/password.png';
import person from '../asset/login/person.png';
export function Setup(props)
{
    const [action,setAction] = useState("Login");
    const [val, setVal] = useState("Name");
    const handleChange = (event) => {
        // 👇 Get input value from "event"
        setVal(event.target.value);
    };
    const clickHandler = ()=>{
        alert("Welcome! User profile updated successfully~");
        window.location = `/`;
    }
    const clickHandlerToHome = ()=>{
        window.location = `/`;
    }

    const CLIENT_ID = "296e5dd18ce041a48bc1f416312b3013";
    const SPOTIFY_AUTHORIZE_ENDPOINT="https://accounts.spotify.com/authorize";
    const REDIRECT_URL = "http://localhost:3000";
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
                    <div className={action==='Sign Up'?"submit gray":"submit"}
                    onClick={()=>{setAction("Login")}}>Login</div> 
                    <div className={action==='Sign Up'?"submit gray":"submit"} onClick={handleSpotify}> 
                        Spotify 
                    </div>    
                    <div className={action==='Login'?"submit gray":"submit"}
                    onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                </div>
                {/* IO */}
                <div className="forgot-password">Hello {val}! </div>
                <div className="inputs">
                    <div className="input">
                        <img src={person} alt="person"></img>
                        <input type="text" placeholder="Name" onChange={handleChange}></input>
                    </div>
                    <div className="input">
                        <img src={email} alt="email"></img>
                        <input type="email" placeholder="Email"></input>
                    </div>
                    <div className="input">
                        <img src={password} alt="password"></img>
                        <input type="password" placeholder="Password"></input>
                    </div>
                </div>
                {/* Submit */}
                <div className="home-container">
                    <div className={"home"} onClick={clickHandler}> 
                        Submit
                    </div>
                    <div className={"home"} onClick={clickHandlerToHome}> 
                        🏠HOME
                    </div>
                </div>
                <div className="forgot-password">Oh! Forget Password? </div>

            </div>
            {/* <AuthProvider authType = {'cookie'}
                          authName = {'_auth'}
            ></AuthProvider> */}

           
        </center>
        <Footer />
        </>
    )
}