import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios'


function NeasCard(props) {

const nea = props.data


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
            <Card sx={{ minWidth: 290, margin: 1 }}>
              {/* <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              /> */}
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
                <Button size="small">Editar</Button>
                <Button size="small" onClick={removeNea}>Borrar</Button>
              </CardActions>
            </Card>
    </div>
  )
}

export default NeasCard
