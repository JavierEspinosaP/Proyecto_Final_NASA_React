import React, {useContext , useState} from "react";
import {DualRing} from 'react-spinners-css';
import useFetch from '../../../hooks/useFetch';





const Home = () => {


  const {loading, result} = useFetch(`https://api.nasa.gov/planetary/apod?api_key=nm3cjMhXbbfsmeZQhhAQAGCgeZpkN985h3xrg8We`);


    return <div className="home">
        {loading?<div className="spinner"><DualRing color="#ffd900" size={250}/></div>:
        <div className="fetchContainer">
        <div className="imgContainer">
        <h1 id="title">{result.title}</h1>
        {result.media_type==="image"?<img className="img-nasa fade-in" id="imagen-nasa" src={result.url} alt="nasa-img" />:<iframe width="1280" height="720" src={result.url}></iframe>}
        </div>
        <div className="info-container">
        <section className="info-nasa">

          <p>{result.explanation}<span>&#160;</span></p>
        </section>
        </div>
        </div>
        }
        </div>
    ;
  }


export default Home;
