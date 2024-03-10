import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { Route,Routes, useLocation,HashRouter as Router} from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import {Home} from "./js/Home";
import { Example } from './js/ExampleSubpage';
import { Setup } from './js/Setup';
import { Timeline } from './js/TimelinePage';
import { InputItems} from './js/InputItems';


const root = ReactDOM.createRoot(document.getElementById('root'));


function App() {
  const location = useLocation();
  return (
  <> 
      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />}/>
          <Route path="/example" element={<Example />}/>
          <Route path="/setup" element={<Setup />}/>
          <Route path="/timeline" element={<Timeline />}/>
          <Route path="/InputItems" element={<InputItems />}/>

          {/* <Route path='/*' element={<NotFound />}/> */}
          <Route path='/*' element={<Home />}/>
        </Routes> 
      </AnimatePresence>
      </>
  )
}

root.render(
  <Router hashType="noslash"> 
    <App />
  </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
