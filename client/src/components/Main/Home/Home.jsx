import React, { useEffect, useState, useContext } from "react";
import {homeContext} from '../../../context/homeContext'



const Home = () => {

  const {setHomeData, homeData, loadingHome} = useContext(homeContext)

    return <div className="home">
      {loadingHome?null:<div className="fetchContainer">
        <div className="info-container">
        <section className="info-nasa">
          <h3>{homeData.title}</h3>
          <p>{homeData.explanation}</p>
        </section>
        </div>

        <div className="imgContainer">
        <img className="img-nasa" src={homeData.url} alt="nasa-img" />
        </div>

        </div>}</div>
    ;
  }


export default Home;
