import React, {useContext} from "react";
import Button from '@mui/material/Button';
import axios from 'axios'
import {useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {neasContext} from '../../../../context/neasContext'
import Swal from 'sweetalert2/dist/sweetalert2.js';


function NeasEditForm(props) {

  const designation = props.designation
  const discovery_date = props.discovery_date
  const close = props.handleClose

  const { register, handleSubmit } = useForm();
  const { neasData, setNeasData } = useContext(neasContext)


  const imgStyle = {
    width: 200
  }

  const updateNea = async(upNea)=>{

    console.log(props);
    try {
  
  
      const period_yr = Number(upNea.period_yr)
      const upNeaObj = {
        designation: upNea.designation!=''?upNea.designation:props.designation,
        h_mag: props.h_mag,
        moid_au: props.moid_au,
        q_au_1: props.q_au_1,
        q_au_2: props.q_au_2,
        i_deg: props.i_deg,
        pha: props.pha,
        discovery_date: upNea.discovery_date!=''?upNea.discovery_date:props.discovery_date,
        period_yr: upNea.period_yr!=''?period_yr:props.period_yr,
        orbit_class: upNea.orbit_class!=''?upNea.orbit_class:props.orbit_class,
      };
  
      const res = await axios.put(`https://sleepy-retreat-77024.herokuapp.com/api/astronomy/neas/edit/${designation}`, upNeaObj);
      const data = await res.data;
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'NEA guardada!',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        window.location.reload(false);      
        }, 1800);
  
  
    } catch (error) {
      console.log(error);
    }
  }

  return ( 
    <div className="formContainer">
      <form onSubmit={handleSubmit(updateNea)} >
        <h4 className="neaName"> Editar {designation}</h4>
        <TextField {...register("designation")} placeholder={designation} />
        <TextField {...register("discovery_date")} placeholder={discovery_date} />
        <TextField {...register("period_yr")} placeholder={`${props.period_yr} periodos/año`} />
        <TextField {...register("orbit_class")}placeholder={props.orbit_class} />
        <Button type="submit" onClick={close} variant="contained">Submit</Button>
      </form>
      <div id="imgContainer">
      <img src={props.img} style={imgStyle} alt="nea_img" />        
      </div>
    </div>
  )
}

export default NeasEditForm
