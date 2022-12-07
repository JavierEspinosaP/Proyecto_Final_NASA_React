import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer';
import { neasContext } from './context/neasContext';
import { landingsContext } from './context/landingsContext'
import { loginContext } from './context/loginContext'
import { productsContext } from './context/productsContext'
import { countContext } from './context/countContext'
import { imageContext } from './context/imageContext'
import images from './components/Main/img.js'
import './styles/styles.scss';
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [landingsData, setLandingsData] = useState([])

  const [neasData, setNeasData] = useState([])

  const [loginData, setLoginData] = useState(false)

  const [countProducts, setCount] = useState(0)

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const arrImages = [];

  const resetPage = () =>{
    window.location.reload(false);    
  }





  useEffect(() => {
    async function fetchData() {
      try {
        // Petición HTTP

        const resLandings = await axios.get("https://sleepy-retreat-77024.herokuapp.com/api/astronomy/landings");
        const landings = await resLandings.data;

        // const landingsImg = await landings.map((l, i) => ({ ...l, img: arrImages[i] }))
        const resNeas = await axios.get("https://sleepy-retreat-77024.herokuapp.com/api/astronomy/neas");
        const neas = await resNeas.data;

        

        // Guarda en el array de posts el resultado. Procesa los datos

        setNeasData(neas)

            const paintImages = () => {
            for (let i = 0; i < landings.length; i++) {
              if (arrImages.length < landings.length) {
                arrImages.push(images[Math.floor(Math.random() * images.length)])
              }
            }
            for (let i = 0; i < neas.length; i++) {
              if (arrImages.length < neas.length) {
                arrImages.push(images[Math.floor(Math.random() * images.length)])
              }
            }
          }
          paintImages(); 

    setLandingsData(landings.map((l, i) => ({ ...l, img: arrImages[i] })))  
    setNeasData(neas.map((l, i) => ({ ...l, img: arrImages[i] })))  
      } catch (e) {
        setLandingsData([])
        setNeasData([])
      }
    }
    fetchData();



// eslint-disable-next-line
  }, []);

      const restartAutoReset = () => {
        setTimeout(() => {
            resetPage();
          }, 30 * 60 * 1000);
        };
      
  const onMouseMove = () => {
          if (loginData) {
          restartAutoReset();         
          }

        };

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

  const imageObj = {
    arrImages
  }

  return (
    <div className="App" onMouseMove={onMouseMove}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <imageContext.Provider value={imageObj}>
            <loginContext.Provider value={loginObj}>
              <countContext.Provider value={countObj}>
                <productsContext.Provider value={productsObj}>
                  <Header />
                  <landingsContext.Provider value={landingsDataObj}>
                    <neasContext.Provider value={neasDataObj}>
                      <Main />
                    </neasContext.Provider>
                  </landingsContext.Provider>
                </productsContext.Provider>
              </countContext.Provider>
            </loginContext.Provider>
          </imageContext.Provider>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
