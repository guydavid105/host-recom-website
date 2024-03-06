import './../index.css';
import {Top} from "./helper/Top";
import { HashLink } from 'react-router-hash-link';

export function InputItems(){

    const clickHandlerToHome = ()=>{
        window.location = `/`;
    }

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

        let item1 = document.getElementById('item-1-id').value;
        let item2 = document.getElementById('item-2-id').value;
        let item3 = document.getElementById('item-3-id').value;
        let item4 = document.getElementById('item-4-id').value;
        let item5 = document.getElementById('item-5-id').value;

        if (item1 === '' && item2 === '' && item3 === '' && item4 === '' && item5 === '') {
            alert("Please fill in the information");
        }
        else {
            if (item1 == '') {
                item1 = '-';
            }
            if (item2 == '') {
                item2 = '-';
            }
            if (item3 == '') {
                item3 = '-';
            }
            if (item4 == '') {
                item4 = '-';
            }
            if (item5 == '') {
                item5 = '-';
            }

            const movie_url = `https://incubo.serveo.net/api/v1/people/recomm-no-id/movie/${item1}/${item2}/${item3}/${item4}/${item5}`;
            const book_url = `https://incubo.serveo.net/api/v1/people/recomm-no-id/book/${item1}/${item2}/${item3}/${item4}/${item5}`;
            const song_url = `https://incubo.serveo.net/api/v1/people/recomm-no-id/song/${item1}/${item2}/${item3}/${item4}/${item5}`;

            const movie_data = async () => {
                const m_response = await fetch(movie_url);
                const m_data = await m_response.json();
                console.log(m_data);
                return m_data;
            }; 
            const book_data = async () => {
                const b_response = await fetch(book_url);
                const b_data = await b_response.json();
                console.log(b_data);
                return b_data;
            };
            const song_data = async () => {
                const s_response = await fetch(song_url);
                const s_data = await s_response.json();
                console.log(s_data);
                return s_data;
            };
            async function recommendations(){
                const m_data = await movie_data();
                const b_data = await book_data();
                const s_data = await song_data();
                if (m_data.length != 0) {
                    localStorage.setItem('movie', JSON.stringify(m_data));
                }
                if (b_data.length != 0) {
                    localStorage.setItem('book', JSON.stringify(b_data));
                }
                if (s_data.length != 0) {
                    localStorage.setItem('song', JSON.stringify(s_data));
                }

                alert("Recommendations are ready!");
                window.location = `/`;
            }
            recommendations();
        }

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