import React, { useContext, useState} from 'react'
import { landingsContext } from '../../../../context/landingsContext'
import Button from '@mui/material/Button';
import usePagination from "../../../../hooks/usePagination"
import Pagination from '@mui/material/Pagination';
import CardList from './CardList';
import LandingsForm from './LandingsForm';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import ContentLoader from 'react-content-loader'
// import images from '../../img';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function LandingsList() {

  const { landingsData, setLandingsData } = useContext(landingsContext)
  // console.log(landingsData);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);
  const [searchData, setSearchData] = useState([])
  const count = Math.ceil(landingsData.length / PER_PAGE);
  const _DATA = usePagination(landingsData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  function handleSortMass() {
    const data = [...landingsData].sort((a, b) => {
      return a.mass > b.mass ? 1:-1
    })
    setLandingsData(data)
  }


  function handleSortName() {
    const data = [...landingsData].sort((a, b) => {
      return a.name > b.name ? 1:-1
    })
    setLandingsData(data)
  }

  function handleSortYear() {
    const data = [...landingsData].sort((a, b) => {
      return a.year > b.year ? 1:-1
    })
    setLandingsData(data)
  }

  const removeLanding = (i) =>{
    const remainingLandings = landingsData.filter((l,j)=>i!==j)
    setLandingsData(remainingLandings);
  }



  const handleSubmit = async (e) =>{
    e.preventDefault();
    const landing = e.target.name.value;
    let landingUpper = landing.charAt(0).toUpperCase() + landing.slice(1);
    const res = await axios.get(`http://localhost:3000/api/astronomy/landings?name=${landingUpper}`)
    setSearchData(res.data[0])
    e.target.name.value="";
  }

// const arrImages = [];    




// const paintImages = () => {

//      for (let i = 0; i < landingsData.length; i++) {
//       if (arrImages.length < landingsData.length) {
//         arrImages.push(images[Math.floor(Math.random() * images.length)])
//       }}
      
//     }
//     paintImages();





  return (
    <div className="landingsList">
      {/* {arrImages.length>1?null:paintImages()} */}
      <div className="modalAdd">
      <Button onClick={handleOpenAdd}>Añadir Landing</Button>
      <Modal
        keepMounted
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <LandingsForm edit={openAdd} />
        </Box>
      </Modal>
      </div>


      <div className="search">
      <form onSubmit={handleSubmit}>
          <TextField name="name" label="Busqueda de Landings" />
          <Button type="submit" variant="contained" onClick={handleOpenSearch}>Search</Button>
        </form>
      </div>
      <div className="modalAdd">
      <Modal
        keepMounted
        open={openSearch}
        onClose={handleCloseSearch}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {}
        {searchData.id?<img src={landingsData[Math.floor(Math.random() * 99)].img} alt="AsteroidImg" />:null}
        <p className="searchData">· Nombre: {searchData.name}</p>
        <p className="searchData">· Masa: {searchData.mass}kg</p>
        <p className="searchData">· Latitud: {searchData.recclat}º</p>
        <p className="searchData">· Longitud: {searchData.reclong}º</p>
        <p className="searchData">· Fecha de descubrimiento: {String(searchData.year).slice(0,10)}</p>
        </Box>
      </Modal>
      <div className="botones">
          <Button onClick={handleSortName} variant="outlined">Ordenar por Nombre</Button>
          <Button onClick={handleSortYear} variant="outlined">Ordenar por Año</Button>
          <Button onClick={handleSortMass} variant="outlined">Ordenar por Peso</Button>
        </div>
      </div>


      <section className="cardsContainer">
        {console.log(_DATA.currentData())}
        {_DATA.currentData().map((d, i) => <CardList  landing={d} key={i} remove={()=>removeLanding(i)}/>)}
      </section>
      <section className="formContainer">

        <form action="">

        </form>
      </section>
      <section className="pagination">

        <Pagination
          count={count}
          size="large"
          color="primary"
          page={page}
          variant="outlined"
          onChange={handleChange}
          className="muiPag"
        />
      </section>

    </div>
  )
}

export default LandingsList
