import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { useSelector, useDispatch } from 'react-redux';
import logoutImg from '../../../assets/logout.png'
import logoutSound from '../../../assets/sounds/logout_complete.wav'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useNavigate } from 'react-router-dom';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  'min-width': 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Nav = () => {

  const { loginData, setLoginData } = useContext(loginContext)
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  let handleCloseLogin = () => setOpenLogin(false);
  const numberCart = useSelector(state => state.numberCart);
  const dispatch = useDispatch();

  const landings = ["l", "a", "n", "d", "i", "n", "g", "s"]
  const landingBlue = []

  const [clicks, setClicks] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const navigate = useNavigate();

  const handleImageClick = () => {
    setClicks(clicks + 1);

    if (clicks === 0) {
      const startTime = Date.now();
      setElapsedTime(startTime);
    }

    if (clicks + 1 === 10 && Date.now() - elapsedTime <= 3000) {
      setClicks(0);
      setElapsedTime(0);
      navigate('/game')
    }
    if (clicks > 10) {
      setClicks(0);
    }

    setTimeout(() => {
      setClicks(0);
      setElapsedTime(0);
    }, 3000);
  }




  const landingsMap = () => {
    landings.map(l =>
      landingBlue.push(l)

    )
  }

  useEffect(() => {

    handleCloseLogin = () => {
      if (loginData) {
        setOpenLogin(false);
      }
    }
    handleCloseLogin()
  }, [loginData])





  const [openCart, setOpenCart] = React.useState(false);
  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);
  const [play, { stop }] = useSound(
    tick,
    { volume: 0.3 }
  );
  const [change] = useSound(changeSound, { volume: 0.5 });
  const [logout] = useSound(logoutSound, { volume: 0.5 });
  const [isHovering, setIsHovering] = React.useState(false);

  const { countProducts } = useContext(countContext)

  useEffect(() => {
    if (numberCart == 0) {
      setOpenCart(false)
    }
  }, [numberCart])




  const handleLogout = () => {
    setLoginData(false)
    dispatch({
      type: "REMOVE_ALL_PRODUCTS"
    })
    Swal.fire({
      icon: 'success',
      title: 'Logout complete',
      showConfirmButton: false,
      timer: 3000
    })
    logout()
  }


  return <div className="nav">
    <img id="logo" onClick={handleImageClick} src={logo} alt="" />
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
        landingsMap()
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}
    >{landings}</Link>
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
    {loginData ? null : <p className="nav-link" id="login" onClick={handleOpenLogin}
      onMouseEnter={() => {
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}>Login/Register</p>}


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



    {loginData ?
      <div className="cartContainer">
        {numberCart > 0 ?
          <div><Link to="/cart"><img id="cart" src={CartImg} alt="Carro" /></Link></div> : null}
        {countProducts === 1 ?
          <p className="fontAddProducts">  {String(numberCart)} Producto añadido</p> : <p className="fontAddProducts">{String(numberCart)} Productos añadidos</p>}
        <Button id="logoutButton" onClick={handleLogout} ><img id="logoutImg" src={logoutImg} alt="logoutImg" /></Button>
      </div> : null}
    {/* <Modal
      keepMounted
      open={openCart}
      onClose={handleCloseCart}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box  sx={style}>
        <Cart edit={openCart} />
      </Box>
    </Modal> */}
  </div>;
}


export default Nav;
