import React, { Component } from "react";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

function LandingsEditForm(props) {

const name = props.name

  return (
    <div className="formContainer">
      <FormControl>
        <h4 className="landingName">Editar {name}</h4>
        <Input placeholder="Masa en kg" />
        <Input placeholder="Latitud" />
        <Input placeholder="Longitud" />
        <Input placeholder="Fecha" />
        <Button type="submit" variant="raised">Submit</Button>
      </FormControl>
    </div>
  )
}

export default LandingsEditForm