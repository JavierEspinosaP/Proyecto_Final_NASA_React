import React, { useContext, useState } from 'react'
import { landingsContext } from '../../../../context/landingsContext'
import Button from '@mui/material/Button';
import usePagination from "../../../../hooks/usePagination"
import Pagination from '@mui/material/Pagination';
import CardList from './CardList';
import LandingsForm from './LandingsForm';
import { Switch } from '@mui/material';


function LandingsList() {
  const { landingsData, setLandingsData } = useContext(landingsContext)
  const [showText, setShowText] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const label = { inputProps: { 'aria-label': 'Color switch demo' } };

  const count = Math.ceil(landingsData.length / PER_PAGE);
  const _DATA = usePagination(landingsData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };



  return (
    <div className="landingsList">
              <div className="toggle">
              {showText && <LandingsForm/>}
              <Switch {...label} color="warning" onClick={() => setShowText(!showText)} />
        </div>
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

      <section className="cardsContainer">
        {_DATA.currentData().map((d, i) => <CardList data={d} key={i} />)}
      </section>
      <section className="formContainer">

        <form action="">

        </form>
      </section>
    </div>
  )
}

export default LandingsList
