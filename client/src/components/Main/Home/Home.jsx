import React, { useEffect, useState, useContext } from "react";
import {homeContext} from '../../../context/homeContext'



const Home = () => {

  const {setData, data, loading} = useContext(homeContext)

    return <div className="home">
      {loading?null:<div className="fetchContainer">
        <div className="info-container">
        <section className="info-nasa">
          <h3>{data.title}</h3>
          <p>{data.explanation}</p>
        </section>
        </div>

        <div className="imgContainer">
        <img className="img-nasa" src={data.url} alt="nasa-img" />
        </div>

        </div>}</div>
    ;
  }


export default Home;
