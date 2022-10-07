import React, { useContext, useState } from 'react'
import { landingsContext } from '../../../../context/landingsContext'
import Button from '@mui/material/Button';
import usePagination from "../../../../hooks/usePagination"
import Pagination from '@mui/material/Pagination';
import CardList from './CardList';
import LandingsForm from './LandingsForm';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function LandingsList() {


  const { landingsData, setLandingsData } = useContext(landingsContext)
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const count = Math.ceil(landingsData.length / PER_PAGE);
  const _DATA = usePagination(landingsData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  function handleSortName() {
    const sortedData = [...landingsData].sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
    setLandingsData(sortedData)
  }

  function handleSortYear() {
    const sortedData = [...landingsData].sort((a, b) => {
      return a.year > b.year ? 1 : -1
    })
    setLandingsData(sortedData)
  }

  function handleSortMass() {
    const sortedData = [...landingsData].sort((a, b) => {
      return a.mass > b.mass ? 1 : -1
    })
    setLandingsData(sortedData)
  }

  const removeLanding = (i) =>{
    const remainingLandings = landingsData.filter((l,j)=>i!==j)
    setLandingsData(remainingLandings);
  }



  return (
    <div className="landingsList">
      <div className="modal">
      <Button onClick={handleOpen}>Añadir Landing</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <LandingsForm edit={open} />
        </Box>
      </Modal>
      </div>
      <section className="pagination">
        <div className="botones">
          <Button onClick={handleSortName} variant="outlined">Ordenar por Nombre</Button>
          <Button onClick={handleSortYear} variant="outlined">Ordenar por Año</Button>
          <Button onClick={handleSortMass} variant="outlined">Ordenar por Peso</Button>
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
        {_DATA.currentData().map((d, i) => <CardList data={d} key={i} remove={()=>removeLanding(i)} />)}
      </section>
      <section className="formContainer">

        <form action="">

        </form>
      </section>
    </div>
  )
}

export default LandingsList
