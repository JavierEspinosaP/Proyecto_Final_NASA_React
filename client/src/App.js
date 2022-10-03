import React, { useEffect, useState} from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer';
import {homeContext} from './context/homeContext'
import './styles/styles.scss';
import useFetch from './hooks/useFetch';

function App() {

  const { loading, result } = useFetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_APIKEY}`);

  const [data, setData] = useState([])

  useEffect(()=>{
    setData(result)
  }, [result])

  const homeData = {
    data, setData, loading
  }

  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
    <homeContext.Provider value={homeData}>
    <Main/>      
    </homeContext.Provider>
    <Footer/>       
    </BrowserRouter> 
    </div>
  );
}

export default App;
