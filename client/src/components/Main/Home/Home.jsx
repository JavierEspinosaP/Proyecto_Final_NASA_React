import React, {useContext } from "react";
import {homeContext} from '../../../context/homeContext'



const Home = () => {

  const {homeData, loadingHome} = useContext(homeContext)
  console.log(homeData.url);

    return <div className="home">
      {loadingHome?null:<div className="fetchContainer">


        <div className="imgContainer">
        <h1 id="title">{homeData.title}</h1>
        {homeData.media_type==="image"?<img className="img-nasa fade-in" id="imagen-nasa" src={homeData.url} alt="nasa-img" />:<iframe width="1280" height="720" src={homeData.url}></iframe>}
        </div>
        <div className="info-container">
        <section className="info-nasa">

          <p>{homeData.explanation}<span>&#160;</span></p>
        </section>
        </div>
        </div>}</div>
    ;
  }


export default Home;
