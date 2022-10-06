import React, { Component } from "react";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

function LandingsForm() {



  return (
    <div className="formContainer">
      <FormControl>
        <Input placeholder="Nombre" />
        <Input placeholder="Masa en kg" />
        <Input placeholder="Latitud" />
        <Input placeholder="Longitud" />
        <Input placeholder="Fecha" />
        <Button type="submit" variant="raised">Submit</Button>
      </FormControl>
    </div>
  )
}

export default LandingsForm