import React from "react";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


function NeasEditForm(props) {

  const name = props.name

  return (
    <div className="formContainer">
      <FormControl>
        <h4 className="neaName"> Editar {name}</h4>
        <Input placeholder="Masa en kg" />
        <Input placeholder="Periodo/Año" />
        <Input placeholder="Clase de órbita" />
        <Button type="submit" variant="raised">Submit</Button>
      </FormControl>
    </div>
  )
}

export default NeasEditForm
