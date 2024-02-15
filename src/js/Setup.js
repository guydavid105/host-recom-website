import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import {Top} from "./helper/Top";
import Footer from "./helper/Footer";

export function Setup()
{

    return(
        <>
        <Top />
        <br></br>
        <center>
            Setup
            <br/><br/>
            <a href="/">🏠HOME</a>
        </center>
        <br/><br/> <br/><br/>  <br/><br/>
        <br/><br/> <br/><br/>  <br/><br/>
        <br/><br/> <br/><br/>  <br/><br/>
        <br/><br/> 
        <Footer />
        </>
    )
}