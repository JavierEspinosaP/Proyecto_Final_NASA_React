import React, { useEffect, useState, useContext } from "react";
import {homeContext} from '../../../context/homeContext'



const Home = () => {

  const {setHomeData, homeData, loadingHome} = useContext(homeContext)

    return <div className="home">
      {loadingHome?null:<div className="fetchContainer">
        <div className="info-container">
        <section className="info-nasa">
          <h3>{homeData.title}</h3>
          <p>{homeData.explanation}<span>&#160;</span></p>
        </section>
        </div>

        <div className="imgContainer">
        
        {homeData.media_type=="image"?<img className="img-nasa fade-in" id="imagen-nasa" src={homeData.url} alt="nasa-img" />:<video src={homeData.url}>

</video>}
        </div>

        </div>}</div>
    ;
  }


export default Home;
