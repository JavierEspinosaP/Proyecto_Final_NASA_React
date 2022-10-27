import React, {useContext} from "react";
import Button from '@mui/material/Button';
import axios from 'axios'
import {useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {neasContext} from '../../../../context/neasContext'


function NeasEditForm(props) {

  const designation = props.designation

  const { register, handleSubmit } = useForm();
  const { neasData, setNeasData } = useContext(neasContext)

  const updateNea = async(upNea)=>{

    console.log(props);
    try {
  
  
      const upNeaObj = {
        designation: upNea.designation!=''?upNea.designation:props.designation,
        date: upNea.discovery_date!=''?upNea.discovery_date:props.discovery_date,
        period: upNea.period_yr!=''?upNea.period_yr:props.period_yr,
        orbit: upNea.orbit_class!=''?upNea.orbit_class:props.orbit_class,
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
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </div>
  )
}

export default NeasEditForm
