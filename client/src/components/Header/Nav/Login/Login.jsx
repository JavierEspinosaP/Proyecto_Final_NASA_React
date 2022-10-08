import React, {useContext} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {loginContext} from '../../../../context/loginContext'

const Login = () => {

  const { loginData,setLoginData} = useContext(loginContext)

  const loginValidation = async (user)=>{
    try {
      const res = await axios.get(`http://localhost:3000/api/users/${user.nickname}`)
      const data = await res.data;
      console.log(data);
      if (data.length > 0) {
        setLoginData(true)

      }

    }
    catch {

    }
  }

  const { register, handleSubmit } = useForm();

    return  (<div className="formContainer">
    <form onSubmit={handleSubmit(loginValidation)}>
      <h4 className="landingName">Introduce tu nickname</h4>

      <TextField name="nickname" {...register("nickname")} placeholder="Nickname  " />

      <Button type="submit" variant="raised" >Submit</Button>
    </form>
  </div>)
  }


export default Login;
