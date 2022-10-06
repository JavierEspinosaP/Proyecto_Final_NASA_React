
import React, { useContext, useState } from 'react'
import { neasContext } from '../../../context/neasContext'
import Button from '@mui/material/Button';
import usePagination from "../../../hooks/usePagination"
import Pagination from '@mui/material/Pagination';
import { Switch } from '@mui/material';
import NeasCard from './NeasCard';
import NeasForm from './NeasForm';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
 


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
  const [showText, setShowText] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const label = { inputProps: { 'aria-label': 'Color switch demo' } };

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
      <section className="pagination">
        <div className="btns">
          <Button onClick={handleSortOrbit} variant="outlined">Ordenar por Órbita</Button>
          <Button onClick={handleSortYear} variant="outlined">Ordenar por Año</Button>
          <Button onClick={handleSortPeriod} variant="outlined">Ordenar por Periodo</Button>
        </div>
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

      <section className="cardsContainer">
        {_DATA.currentData().map((d, i) => <NeasCard data={d} key={i} remove={()=>removeNea(i)} />)}
      </section>
      <section className="formContainer">

        <form action="">

        </form>
      </section>
</div>;
}


export default NEAS;
