import React from "react";
import Button from '@mui/material/Button';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import {useForm} from 'react-hook-form';

function LandingsEditForm(props) {


const { register, handleSubmit } = useForm();

const updateLanding = async(upLanding)=>{

  console.log(props);

  try {


    const upLandingObj = {
      id: props.id,
      name: upLanding.name!=''?upLanding.name:props.name,
      mass: upLanding.mass!=''?upLanding.mass:props.mass,
      year: upLanding.year!=''?upLanding.year:props.year,
      reclat: upLanding.reclat!=''?upLanding.reclat:props.lat,
      reclong: upLanding.reclong!=''?upLanding.reclong:props.long,
    };

    const res = await axios.put(`http://localhost:3000/api/astronomy/landings/update/${props.id}`, upLandingObj);
    const data = await res.data;
    console.log(data);


  } catch (error) {
    console.log(error);
  }
}

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(updateLanding)}>
        <h4 className="landingName">Editar {props.name}</h4>
        <TextField name="name" {...register("name")} placeholder="Nombre" />
        <TextField name="mass" {...register("mass")} placeholder="Masa en kg" />
        <TextField name="reclat" {...register("reclat")} placeholder="Latitud" />
        <TextField name="reclong" {...register("reclong")} placeholder="Longitud" />
        <TextField name="year" {...register("year")} placeholder="Fecha" />
        <Button type="submit" variant="contained" >Submit</Button>
      </form>
    </div>
  )
}

export default LandingsEditForm