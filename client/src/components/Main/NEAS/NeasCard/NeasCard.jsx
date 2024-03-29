import React, {useContext} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import NeasEditForm from '../NeasEditForm';
import CardMedia from '@mui/material/CardMedia';
import { loginContext } from '../../../../context/loginContext';
import { useDispatch } from 'react-redux';



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


function NeasCard(props) {

  const precision = 10;
  let priceItem = Math.floor(Math.random() * (10 * precision  - 1 * precision) + 1 * precision) / (10*precision)

  const nea = {...props.data, price:priceItem}
  const [open, setOpen] = React.useState(false);

  const { loginData } = useContext(loginContext)

  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  const dispatch = useDispatch();


  const removeNea = async () => {
    try {
      const res = await axios.delete(`https://nasa-app-fzbq.onrender.com/api/astronomy/neas/delete/${nea.designation}`);
      const data = await res.data;
      console.log(data);
      props.remove();
    } catch (e) {
      console.log(e);
    }
  }

  // h_mag: props.h_mag,
  //         moid_au: props.moid_au,
  //         q_au_1: props.q_au_1,
  //         q_au_2: props.q_au_2,
  //         i_deg: props.i_deg,
  //         pha: props.pha,
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
            <NeasEditForm handleClose={handleClose} img={nea.img} h_mag={nea.h_mag} moid_au={nea.moid_au} q_au_1={nea.q_au_1} q_au_2={nea.q_au_2} i_deg={nea.i_deg} pha={nea.pha} designation={nea.designation} discovery_date={nea.discovery_date} period_yr={nea.period_yr} orbit_class={nea.orbit_class} />
          </Box>
        </Modal>
      </div>
      <Card sx={{ minWidth: 290, margin: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={nea.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nea.designation}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
                  - Designación: {nea.designation}
                </Typography> */}
          <Typography variant="body2" color="text.secondary">
            - Fecha: {String(nea.discovery_date).slice(0, 10)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Periodo/Año:{nea.period_yr}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Clase de órbita: {nea.orbit_class}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>Editar</Button>
          <Button size="small" onClick={removeNea}>Borrar</Button>
          {loginData ? <Button size="small" onClick={() => {
            dispatch({
              type: "ADD_CART",
              payload: nea
            })
          }} >Añadir al carro</Button> : null}
        </CardActions>
      </Card>
    </div>
  )
}

export default NeasCard
