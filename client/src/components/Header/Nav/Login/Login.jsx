import React, {useContext} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {loginContext} from '../../../../context/loginContext'
import Swal from 'sweetalert2'

const Login = (props) => {

  const close = props.close

  const {setLoginData} = useContext(loginContext)

  const loginValidation = async (user)=>{
    try {
      const res = await axios.get(`https://sleepy-retreat-77024.herokuapp.com/api/users/${user.nickname}`)
      const data = await res.data;
      // const validPass = await bcrypt.compare(password, response[0].password)
      console.log(data);
      if (data.length > 0) {
        setLoginData(true)
      }
      Swal.fire({
        icon: 'success',
        title: 'Usuario logueado!',
        showConfirmButton: false,
        timer: 2000
      })

    }
    catch {

    }
  }

  const { register, handleSubmit } = useForm();

    return  (<div className="formContainer">
    <form onSubmit={handleSubmit(loginValidation)}>
      <h4 className="landingName">Introduce tu nickname (introduce "usuario" para la demo)</h4>

      <TextField name="nickname" {...register("nickname")} placeholder="Nickname  " />

      <Button type="submit" variant="contained" onClick={close} >Submit</Button>
    </form>
  </div>)
  }


export default Login;
