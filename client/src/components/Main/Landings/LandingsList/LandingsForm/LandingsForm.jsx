import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios'

function LandingsForm() {

  const { register, handleSubmit } = useForm();

  const createLanding = async(landing)=>{

  
    try {
  
  
      const landingObj = {
        id: landing.id,
        name: landing.name,
        mass: landing.mass,
        year: landing.year,
        reclat: landing.reclat,
        reclong: landing.reclong,
      };
  
      const res = await axios.post(`http://localhost:3000/api/astronomy/landings/create`, landingObj);
      const data = await res.data;
      console.log(data);
  
  
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(createLanding)}>
        <h4 className="landingName">Introduce los datos de tu Landing</h4>
        <TextField name="id" {...register("id")} placeholder="Id" />
        <TextField name="name" {...register("name")} placeholder="Nombre" />
        <TextField name="mass" {...register("mass")} placeholder="Masa en kg" />
        <TextField name="reclat" {...register("reclat")} placeholder="Latitud" />
        <TextField name="reclong" {...register("reclong")} placeholder="Longitud" />
        <TextField name="year" {...register("year")} placeholder="Fecha" />
        <Button type="submit" variant="raised" >Submit</Button>
      </form>
    </div>
  )
}

export default LandingsForm