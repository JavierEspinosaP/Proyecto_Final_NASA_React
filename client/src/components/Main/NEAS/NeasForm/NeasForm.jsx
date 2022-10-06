import React from "react";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


function NeasForm() {


  return (
    <div>      
      <FormControl>
      <Input placeholder="Masa en kg" />
      <Input placeholder="Periodo/Año" />
      <Input placeholder="Clase de órbita" />
      <Button type="submit" variant="raised">Submit</Button>
    </FormControl></div>
  )
}

export default NeasForm
