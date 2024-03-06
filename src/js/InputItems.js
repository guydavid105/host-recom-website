import './../index.css';
import {Top} from "./helper/Top";
import { HashLink } from 'react-router-hash-link';

export function InputItems(){

    const clickHandlerToHome = ()=>{
        window.location = `/`;
    }

    const clickHandler = ()=>{

    }

    return(
    <>
    <Top />
    <center>

        <div className='container'>
            <h2>Please enter any song, movie or book (up to 5)</h2>
            <div className="inputs">
                <div className="input">
                    <input type="    Item 1" placeholder="Item 1" id="item-1-id"></input>
                </div>
                <div className="input">
                    <input type="Item 2" placeholder="Item 2" id="item-2-id"></input>
                </div>
                <div className="input">
                    <input type="Item 3" placeholder="Item 3" id="item-3-id"></input>
                </div>
                <div className="input">
                    <input type="Item 4" placeholder="Item 4" id="item-4-id"></input>
                </div>
                <div className="input">
                    <input type="Item 5" placeholder="Item 5" id="item-5-id"></input>
                </div>
            </div>

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
    </>);
}