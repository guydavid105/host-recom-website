import React, { useState } from "react";
import icon from '../../asset/usricon.jpg';
import { HashLink } from 'react-router-hash-link';

class Username extends React.Component {
    constructor(props){
      super(props);
      this.state = {value: ""};
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
            <h4>Movies x Songs x Books</h4>
        </center>
    </>
)
}
 