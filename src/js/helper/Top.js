import React, { useState } from "react";
import icon from '../../asset/usricon.jpg';
import { HashLink } from 'react-router-hash-link';

class Username extends React.Component {
    constructor(props){
      super(props);
      this.state = {value: "my dear friend"};
    }
  
    changeValue(value) {
      this.setState({value: value});
    }
  
    render() {
      const value = this.state.value;
      return <>{value}</>;
    }
}

export function Top(){
    return(
    <>
       <center>
            <h1>
            Movies x Books x Music Recommendation System!
            </h1>
            <img src={icon} alt="icon" height="20" ></img> Hello <Username/>! &nbsp;
            <HashLink to={{pathname:"/setup"}}>
              Update Profile</HashLink>
            <br/> 

            <i>Trust me, we are <b>the Best!</b> 🥇</i>
            <br/>
        </center>
    </>
)
}
 