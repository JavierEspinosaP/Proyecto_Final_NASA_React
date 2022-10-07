import React from "react";
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function NeasForm() {


  return (
    <div>      
      <FormControl>
      <TextField placeholder="Masa en kg" />
      <TextField placeholder="Periodo/Año" />
      <TextField placeholder="Clase de órbita" />
      <Button type="submit" variant="raised">Submit</Button>
    </FormControl></div>
  )
}

export default NeasForm
