import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer';
import { homeContext } from './context/homeContext'
import { neasContext } from './context/neasContext'
import { landingsContext } from './context/landingsContext'
import { loginContext } from './context/loginContext'
import { productsContext } from './context/productsContext'
import { countContext } from './context/countContext'
import './styles/styles.scss';
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'dotenv'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [homeData, setHomeData] = useState([]);

  const [landingsData, setLandingsData] = useState([])

  const [neasData, setNeasData] = useState([])

  const [loginData, setLoginData] = useState(false)

  const [countProducts, setCount] = useState(0)

  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        // Petición HTTP

        const resHome = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_APIKEY}`);
        const home = await resHome.data;

        const resLandings = await axios.get("http://localhost:3000/api/astronomy/landings");
        const landings = await resLandings.data;

        const resNeas = await axios.get("http://localhost:3000/api/astronomy/neas");
        const neas = await resNeas.data;

        // Guarda en el array de posts el resultado. Procesa los datos
        setLandingsData(landings);
        setNeasData(neas)
        setHomeData(home)

      } catch (e) {
        setLandingsData([])
        setNeasData([])
        setHomeData([])
      }
    }

    fetchData();
  }, []);


  const homeDataObj = {
    homeData, setHomeData
  }

  const landingsDataObj = {
    landingsData, setLandingsData
  }

  const neasDataObj = {
    neasData, setNeasData
  }

  const loginObj = {
    loginData, setLoginData
  }

  const countObj = {
    countProducts, setCount
  }

  const productsObj = {
    products, setProducts
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <loginContext.Provider value={loginObj}>
            <countContext.Provider value={countObj}>
              <productsContext.Provider value={productsObj}>
                <Header />
                <homeContext.Provider value={homeDataObj}>
                  <landingsContext.Provider value={landingsDataObj}>
                    <neasContext.Provider value={neasDataObj}>
                      <Main />
                    </neasContext.Provider>
                  </landingsContext.Provider>
                </homeContext.Provider>
              </productsContext.Provider>
            </countContext.Provider>
          </loginContext.Provider>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
