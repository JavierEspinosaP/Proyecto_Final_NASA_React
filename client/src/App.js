import React, { useEffect, useState} from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer';
import {homeContext} from './context/homeContext'
import './styles/styles.scss';
import useFetch from './hooks/useFetch';
import axios from 'axios'

function App() {

  const { loading, result } = useFetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_APIKEY}`);

  const [dataLandings, setDataLandings] = useState([])

  const [dataNeas, setDataNeas] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        // Petición HTTP
        const resLandings = await axios.get("http://localhost:3000/api/astronomy/landings");
        const landings = await resLandings.data;

        const resNeas = await axios.get("http://localhost:3000/api/astronomy/neas");
        const neas = await resNeas.data;

        // Guarda en el array de posts el resultado. Procesa los datos
        setDataLandings(landings);
        setDataNeas(neas)


      } catch (e) {
        setDataLandings([])
        setDataNeas([]) 
      }
    }

    fetchData();
  }, []); 

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
