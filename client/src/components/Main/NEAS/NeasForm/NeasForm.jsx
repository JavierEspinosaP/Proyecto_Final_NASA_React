import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import {useForm} from 'react-hook-form';


function NeasForm() {

  const { register, handleSubmit } = useForm();

  const createNea = async(nea)=>{

    try {
  
  
      const neaObj = {
        designation: nea.designation,
        date: nea.discovery_date,
        period: nea.period_yr,
        orbit: nea.orbit_class,
      };
  
      const res = await axios.post(`http://localhost:3000/api/astronomy/neas/create`, neaObj);
      const data = await res.data;
      console.log(data);
  
  
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>      
      <form onSubmit={handleSubmit(createNea)} >
        <h4 className="neaName"> Introduce los datos de tu NEA</h4>
        <TextField {...register("designation")} placeholder="Designation" />
        <TextField {...register("date")} placeholder="Fecha" />
        <TextField {...register("period")} placeholder="Periodo/Año" />
        <TextField {...register("orbit")}placeholder="Clase de órbita" />
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </div>
  )
}

export default NeasForm
