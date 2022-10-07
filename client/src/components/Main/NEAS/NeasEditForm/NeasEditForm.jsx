import React from "react";
import Button from '@mui/material/Button';
import axios from 'axios'
import {useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';


function NeasEditForm(props) {

  const designation = props.name

  const { register, handleSubmit } = useForm();

  const updateNea = async(upNea)=>{

    console.log(props);
    try {
  
  
      const upNeaObj = {
        designation: designation,
        date: upNea.discovery_date,
        period: upNea.period_yr,
        orbit: upNea.orbit_class,
      };
  
      const res = await axios.put(`http://localhost:3000/api/astronomy/neas/update/${designation}`, upNeaObj);
      const data = await res.data;
      console.log(data);
  
  
    } catch (error) {
      console.log(error);
    }
  }

  return ( 
    <div className="formContainer">
      <form onSubmit={handleSubmit(updateNea)} >
        <h4 className="neaName"> Editar {designation}</h4>
        <TextField {...register("designation")} placeholder="Designation" />
        <TextField {...register("date")} placeholder="Fecha" />
        <TextField {...register("period")} placeholder="Periodo/Año" />
        <TextField {...register("orbit")}placeholder="Clase de órbita" />
        <Button type="submit" variant="raised">Submit</Button>
      </form>
    </div>
  )
}

export default NeasEditForm
