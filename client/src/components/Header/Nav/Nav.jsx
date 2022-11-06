import React, { useContext } from "react";
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
import { loginContext } from '../../../context/loginContext';
import { countContext } from '../../../context/countContext';
import Cart from '../../Main/Cart'
import useSound from 'use-sound';
import tick from '../../../assets/sounds/tick.wav'
import changeSound from '../../../assets/sounds/change.wav'
import logo from '../../../assets/nasa.png'

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
  const [play, { stop }] = useSound(
    tick,
    { volume: 0.3 }
  );
  const [change] = useSound(changeSound, { volume: 0.5 });
  const [isHovering, setIsHovering] = React.useState(
    false
  );
  const { loginData } = useContext(loginContext)
  const { countProducts } = useContext(countContext)





  return <div className="nav">
    <img id="logo" src={logo} alt="" />
    <Link className="nav-link" to='/'
      onClick={change}
      onMouseEnter={() => {
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}>Home</Link>

    <Link className="nav-link" to='/landings'
    onClick={change}
      onMouseEnter={() => {
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}>Map</Link>
    <Link className="nav-link" to='/landings/list'
    onClick={change}
      onMouseEnter={() => {
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}
    >Landings</Link>
    <Link className="nav-link" to='/neas'
    onClick={change}
      onMouseEnter={() => {
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}
    >NEAS</Link>
    <p className="nav-link" id="login" onClick={handleOpenLogin}
      onMouseEnter={() => {
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}>Login</p>

    <Modal
      keepMounted
      open={openLogin}
      onClose={handleCloseLogin}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Login edit={openLogin} close={handleCloseLogin} />
      </Box>
    </Modal>
    {loginData ? <div className="cartContainer"><Button onClick={handleOpenCart}><img id="cart" src={CartImg} alt="Carro" /></Button>{countProducts === 1 ? <p className="fontAddProducts">  {String(countProducts)} Producto añadido</p> : <p className="fontAddProducts">{String(countProducts)} Productos añadidos</p>}</div> : null}
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
