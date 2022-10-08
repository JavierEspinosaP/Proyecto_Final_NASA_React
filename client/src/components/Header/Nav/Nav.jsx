import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Login from './Login';
import Button from '@mui/material/Button';
import CartImg from '../../../assets/carro.png';
import {loginContext} from '../../../context/loginContext';
import {countContext} from '../../../context/countContext';
import Cart from '../../Main/Cart'


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


const Nav = () => {

  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const [openCart, setOpenCart] = React.useState(false);
  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);

  const {loginData,setLoginData} = useContext(loginContext)
  const {countProducts,setCount} = useContext(countContext)


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
      <Button onClick={handleOpenLogin}>Login</Button>

      <Modal
        keepMounted
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <Login edit={openLogin} />
        </Box>
      </Modal>
      {loginData?<div className="cartContainer"><Button onClick={handleOpenCart}><img id="cart" src={CartImg} alt="Carro" /></Button>{countProducts== 1?<p>  {String(countProducts)} Producto añadido</p>: <p>{String(countProducts)} Productos añadidos</p>}</div>:null}
      <Modal
        keepMounted
        open={openCart}
        onClose={handleCloseCart}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <Cart edit={openCart} />
        </Box>
      </Modal>
    </div>;
  }


export default Nav;
