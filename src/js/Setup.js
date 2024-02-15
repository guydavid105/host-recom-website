import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {Top} from "./helper/Top";
import Footer from "./helper/Footer";
import email from '../asset/login/email.png';
import password from '../asset/login/password.png';
import person from '../asset/login/person.png';

export function Setup(props)
{
    const [action,setAction] = useState("Sign Up");
    const [val, setVal] = useState("Name");
    const handleChange = (event) => {
        // 👇 Get input value from "event"
        setVal(event.target.value);
    };
    const clickHandler = ()=>{
        alert("Welcome! User profile updated successfully~");
    }
    return(
        <>
        <Top />
        <center>
            <div className='container'>
                <div className='header'>
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="submit-container">
                    <div className={action==='Login'?"submit gray":"submit"}
                    onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==='Sign Up'?"submit gray":"submit"}
                    onClick={()=>{setAction("Login")}}>Login</div>     
                </div>
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
            
                <div className="home-container">
                    <div className={"home"}> 
                        <a href="/"
                        onClick={clickHandler}>Submit</a>
                    </div>
                    <div className={"home"}> 
                        <a href="/">🏠HOME</a>
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