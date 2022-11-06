import React, {useContext} from "react";
import Button from '@mui/material/Button';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import {useForm} from 'react-hook-form';
import Swal from 'sweetalert2'
import {landingsContext} from '../../../../../context/landingsContext'

function LandingsEditForm(props) {

  const { landingsData, setLandingsData } = useContext(landingsContext)

  const imgStyle = {
    width: 200
  }

const close = props.handleClose
const year = props.landing.year.slice(0, 10)

const { register, handleSubmit } = useForm();

const updateLanding = async(upLanding)=>{



  try {


    const upLandingObj = {
      fall:props.landing.fall,
      geolocation: props.landing.geolocation,
      id: props.landing.id,
      img: props.landing.img,
      name: upLanding.name!=''?upLanding.name:props.landing.name,
      mass: upLanding.mass!=''?upLanding.mass:props.landing.mass,
      nametype: props.landing.nametype,
      recclass: props.landing.reclass,
      year: upLanding.year!=''?upLanding.year:props.landing.year,
      reclat: upLanding.reclat!=''?upLanding.reclat:props.landing.reclat,
      reclong: upLanding.reclong!=''?upLanding.reclong:props.landing.reclong,
    };

    const res = await axios.put(`https://sleepy-retreat-77024.herokuapp.com/api/astronomy/landings/update/${props.id}`, upLandingObj);
    const data = await res.data;
    // const refreshLanding = (i) =>{
    //   const upLandingObj = {
    //     id: props.id,
    //     name: upLanding.name!=''?upLanding.name:props.name,
    //     mass: upLanding.mass!=''?upLanding.mass:props.mass,
    //     year: upLanding.year!=''?upLanding.year:props.year,
    //     reclat: upLanding.reclat!=''?upLanding.reclat:props.lat,
    //     reclong: upLanding.reclong!=''?upLanding.reclong:props.long,
    //   };
    //   console.log(landing);
    //   for (let i = 0; i < landingsData.length; i++) {
    //     if (landingsData[i].id == props.id) {
          
    //         const remainingLandings = landingsData.filter((l,j)=>i!==j)
    //         setLandingsData(...remainingLandings,refreshLandingObj)
    //         // setLandingsData(remainingLandings);
          
    //     }
    //   }
    // }
    // refreshLanding();
    Swal.fire({
      icon: 'success',
      title: 'Landing guardada!',
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
      <form onSubmit={handleSubmit(updateLanding)}>
        <h4 className="landingName">Editar {props.landing.name}</h4>
        <TextField name="name" {...register("name")} placeholder={props.landing.name} />
        <TextField name="mass" {...register("mass")} placeholder={`${props.landing.mass} kg`} />
        <TextField name="reclat" {...register("reclat")} placeholder={`${props.landing.reclat}º`} />
        <TextField name="reclong" {...register("reclong")} placeholder={`${props.landing.reclong}º`} />
        <TextField name="year" {...register("year")} placeholder={year} />
        <Button type="submit" variant="contained" onClick={close} >Submit</Button>
      </form>
      <div id="imgContainer">
      <img src={props.landing.img} style={imgStyle} alt="landing_img" />        
      </div>

    </div>
  )
}

export default LandingsEditForm