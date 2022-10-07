import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function LandingsForm() {



  return (
    <div className="formContainer">
      <form action="">
        <TextField placeholder="Nombre" />
        <TextField placeholder="Masa en kg" />
        <TextField placeholder="Latitud" />
        <TextField placeholder="Longitud" />
        <TextField placeholder="Fecha" />
        <Button type="submit" variant="raised">Submit</Button>        
      </form>
    </div>
  )
}

export default LandingsForm