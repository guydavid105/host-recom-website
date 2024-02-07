import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { Route,Routes, useLocation,HashRouter as Router} from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import {Home} from "./js/Home";
import {NotFound} from "./js/404";
import { Example } from './js/Example';

const root = ReactDOM.createRoot(document.getElementById('root'));


function App() {
  const location = useLocation();
  return (
  <> 
      {/* <ScrollToTop> */}
      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />}/>
          <Route path="/example" element={<Example />}/>
          <Route path='/*' element={<NotFound />}/>
        </Routes> 
      </AnimatePresence>
      {/* </ScrollToTop> */}
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
