
import React, { useContext, useState } from 'react'
import { neasContext } from '../../../context/neasContext'
import Button from '@mui/material/Button';
import usePagination from "../../../hooks/usePagination"
import Pagination from '@mui/material/Pagination';
import NeasCard from './NeasCard';
import NeasForm from './NeasForm';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import images from '../../Main/img'
 


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const NEAS = () => {


  const { neasData, setNeasData } = useContext(neasContext)
  console.log(neasData);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);
  const [searchData, setSearchData] = useState([])

  const count = Math.ceil(neasData.length / PER_PAGE);
  const _DATA = usePagination(neasData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  function handleSortOrbit() {
    const sortedData = [...neasData].sort((a, b) => {
      return a.orbit_class > b.orbit_class ? 1 : -1
    })
    setNeasData(sortedData)
  }

  function handleSortYear() {
    const sortedData = [...neasData].sort((a, b) => {
      return a.discovery_date > b.discovery_date ? 1 : -1
    })
    setNeasData(sortedData)
  }

  function handleSortPeriod() {
    const sortedData = [...neasData].sort((a, b) => {
      return a.period_yr > b.period_yr ? 1 : -1
    })
    setNeasData(sortedData)
  }

  const removeNea = (i) =>{
    const remainingNeas = neasData.filter((l,j)=>i!==j)
    setNeasData(remainingNeas);
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const nea = e.target.name.value;
    console.log(nea);
    const res = await axios.get(`http://localhost:3000/api/astronomy/neas?designation=${nea}`)
    const resData = await res.data[0]
    console.log(res);
    setSearchData(resData)

    e.target.name.value="";
  }

  const arrImages = [];  
  const paintImages = () => {

    for (let i = 0; i < neasData.length; i++) {
     if (arrImages.length < neasData.length) {
       arrImages.push(images[Math.floor(Math.random() * images.length)])
     }}
   }
 
 paintImages()



  return <div className="neas">
      <div className="modal">
      <Button onClick={handleOpen}>Añadir NEA</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <NeasForm />
        </Box>
      </Modal>
      </div>

      <div className="search">
      <form onSubmit={handleSubmit}>
          <TextField name="name" label="Busqueda de NEAS" />
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
        {<img src={neasData[Math.floor(Math.random() * 99)].img} alt="AsteroidImg" />}
        <p className="searchData">· Designación: {searchData.designation}</p>
        <p className="searchData">· Órbita: {searchData.orbit_class}</p>
        <p className="searchData">· Periodo: {searchData.period_yr}</p>
        <p className="searchData">· Fecha de descubrimiento: {searchData.discovery_date}</p>
        </Box>
      </Modal>
      </div>
      <section className="pagination">
        <div className="btns">
          <Button onClick={handleSortOrbit} variant="outlined">Ordenar por Órbita</Button>
          <Button onClick={handleSortYear} variant="outlined">Ordenar por Año</Button>
          <Button onClick={handleSortPeriod} variant="outlined">Ordenar por Periodo</Button>
        </div>

      </section>

      <section className="cardsContainer">
        {_DATA.currentData().map((d, i) => <NeasCard data={d} key={i} remove={()=>removeNea(i)} img={arrImages[i]} />)}
      </section>
      <section className="formContainer">

        <form action="">

        </form>
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
</div>;
}


export default NEAS;
