import React from "react";
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

const nea = props.data
const img = props.img
const [open, setOpen] = React.useState(false);

const handleOpen = () => {setOpen(true)}
const handleClose = () => {setOpen(false)}


const removeNea = async () =>{
  try {
    const res = await axios.delete(`http://localhost:3000/api/astronomy/neas/delete/${nea.designation}`);
    const data = await res.data;
    console.log(data);
    props.remove();
  } catch (e) {
    console.log(e);
  }   
}

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
            <NeasEditForm name={nea.designation}/>
          </Box>
        </Modal>
      </div>
            <Card sx={{ minWidth: 290, margin: 1 }}>
              <CardMedia
                component="img"
                height="140"
                image={img}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {nea.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  - Designación: {nea.designation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  - Fecha: {String(nea.discovery_date).slice(0,10)}
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
              </CardActions>
            </Card>
    </div>
  )
}

export default NeasCard
