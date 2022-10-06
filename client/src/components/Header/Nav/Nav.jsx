import React from "react";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Nav = () => {

    return <div className="nav">
      <Link className="nav-link" to='/'>Home</Link>
      <Accordion className="accordion" >
        <AccordionSummary
   
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Landings</Typography>
        </AccordionSummary>
        <AccordionDetails >
      <Link className="nav-link" to='/landings'>Mapa</Link>
        </AccordionDetails>
        <AccordionDetails >
      <Link className="nav-link" to='/landings/list'>Lista</Link>
        </AccordionDetails>
      </Accordion>

      <Link className="nav-link" to='/neas'>NEAS</Link>
      <Link className="nav-link" to='/login'>Login</Link>
    </div>;
  }


export default Nav;
