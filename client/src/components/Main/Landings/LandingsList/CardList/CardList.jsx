import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LandingsEditForm from '../LandingsEditForm';
import { loginContext } from '../../../../../context/loginContext'
import { countContext } from '../../../../../context/countContext'
import { productsContext } from '../../../../../context/productsContext'
import { imageContext } from '../../../../../context/imageContext'
import { useSelector, useDispatch } from 'react-redux';


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

function CardList(props) {


  const landing = props.landing
  // console.log(landing);


  const { loginData } = useContext(loginContext)
  let { countProducts, setCount } = useContext(countContext)
  const { products, setProducts } = useContext(productsContext)
  const { arrImages } = useContext(imageContext)
  // let [numberLandingCount, setNumberLandingCount] = useState(1)

  const dispatch = useDispatch();


  const [open, setOpen] = React.useState(false);

  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  const removeLanding = async () => {
    try {
      const res = await axios.delete(`https://sleepy-retreat-77024.herokuapp.com/api/astronomy/landings/delete/${landing.id}`);
      const data = await res.data;
      console.log(data);
      props.remove();
    } catch (e) {
      console.log(e);
    }
  }

  const manageProducts = () => {
    let numberLandingCount = 1
    const precision = 10;
    let priceItem = Math.floor(Math.random() * (10 * precision  - 1 * precision) + 1 * precision) / (10*precision)

    for (let i = 0; i < products.length; i++) {
      if (products[i].name == landing.name) {
        numberLandingCount++
      }
      
    }
    let landingCount = { ...landing, quantity: numberLandingCount, price: priceItem }   
    setProducts([landingCount, ...products])  
    setCount(countProducts + 1)
  }


  // let isInCart = 0

  // const landingCount = { ...landing, count: numberLandingCount }
  // for (let i = 0; i < products.length; i++) {

  //   if (products[i].name == landing.name) {
  //     setNumberLandingCount(numberLandingCount++)
  //     isInCart++
      
  //   }
  // }

  // if (isInCart == 0) {
  //   setProducts([landingCount, ...products])
  // }
  // console.log(numberLandingCount);
  // setCount(countProducts + 1)



  // for (let i = 0; i < products.length; i++) {
  //   if (products[i].name == landing.name) {
  //     setNumberLandingCount(numberLandingCount++)
  //     setProducts([landingCount, ...products]) 
  //     const remainingLandings = products.slice(i,1)
  //     console.log(remainingLandings);
  //     setProducts(remainingLandings);
  //     // isInCart++
  //   }
  //   else{
  //     let landingCount = { ...landing, count: 1}
  //     setProducts([landingCount, ...products]) 
  //   }
  // }






  return (
    <div>
      <div className="modal">
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <LandingsEditForm handleClose={handleClose} landing={landing} />
          </Box>
        </Modal>
      </div>

      {<Card sx={{ minWidth: 290, margin: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={landing.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {landing.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Masa: {landing.mass} kg
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Latitud:{landing.reclat}º
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Longitud:{landing.reclong}º
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Fecha: {String(landing.year).slice(0, 10)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen} >Editar</Button>
          <Button size="small" onClick={removeLanding}>Borrar</Button>
          {loginData ? <Button size="small" onClick={()=>{
          dispatch({
            type: "ADD_CART",
            payload: landing
          })
        }} >Añadir al carro</Button> : null}
        </CardActions>
      </Card>}
    </div>
  )
}

export default CardList
