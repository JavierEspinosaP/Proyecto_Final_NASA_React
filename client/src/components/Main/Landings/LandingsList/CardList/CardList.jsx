import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function CardList(props) {

  const landing = props.data

  return (
    <div>
      <Card sx={{ maxWidth: 200 }}>
              {/* <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              /> */}
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
                <Button size="small">Editar</Button>
                <Button size="small">Borrar</Button>
              </CardActions>
            </Card>
    </div>
  )
}

export default CardList
