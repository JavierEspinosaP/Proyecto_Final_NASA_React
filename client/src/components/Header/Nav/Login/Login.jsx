import React, { useContext } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { loginContext } from '../../../../context/loginContext'
import Swal from 'sweetalert2'
import bcrypt from 'bcryptjs'

const Login = (props) => {

  const close = props.close 

  const { setLoginData } = useContext(loginContext)

  const loginValidation = async (user) => {
    try {
      const res = await axios.get(`https://sleepy-retreat-77024.herokuapp.com/api/users?email=${user.email}`)
      const data = await res.data;
      const password = user.password
      console.log(password);
      console.log(data);
      const validPass = await bcrypt.compare(password, data[0].password)
      console.log(validPass);
      if (validPass) {
        
        setLoginData(true)
        Swal.fire({
          icon: 'success',
          title: 'Usuario logueado!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
    catch {

    }
  }

  const { register, handleSubmit } = useForm();

  return (<div className="formContainer">
    <form onSubmit={handleSubmit(loginValidation)}>
      <h4 className="landingName">Introduce tus credenciales</h4>

      <TextField name="email" {...register("email")} placeholder="Email  " />
      <TextField name="password" {...register("password")} placeholder="Password  " />

      <Button type="submit" variant="contained">Submit</Button>
    </form>
  </div>)
}


export default Login;
