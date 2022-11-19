import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { loginContext } from '../../../../context/loginContext'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import bcrypt from 'bcryptjs'
import useSound from 'use-sound';
import loginSound from '../../../../assets/sounds/login complete.wav'
import closedEye from '../../../../assets/closedEye.png'
import openEye from '../../../../assets/openEye.png'
import registeredUser from '../../../../assets/sounds/registeredUser.wav'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const regex = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$'

const schema = yup.object({
  nickname: yup.string().required().min(3),
  email: yup.string('introduce a valid email').email('introduce a valid email').required('email is required'),
  password: yup.string().matches(regex),
  passwordRepeat: yup.string().matches(schema.password)
}).required();

const Login = (props) => {

  const close = props.close

  const { setLoginData } = useContext(loginContext)

  const [passwordShown, setPasswordShown] = useState(false);
  const [registerForm, setRegisterForm] = useState(false)

  const nicknameError = 'Nickname is required and must contains 3 or more characters'

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const toggleRegister = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setRegisterForm(!registerForm);
  };


  const [change] = useSound(loginSound, { volume: 0.5 });

  const [registered] = useSound(registeredUser, { volume: 0.5 });

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
          title: 'Login complete',
          showConfirmButton: false,
          timer: 2000
        })
        change()

      }
    }
    catch {

    }
  }

  const registration = async (user) => {

    const hash = await bcrypt.hash(user.password, 10)

    const userCrypt = {
      nickname: user.nickname,
      email: user.email,
      password: hash
    }

    try{
      const res = await axios.post("https://sleepy-retreat-77024.herokuapp.com/api/users/create", userCrypt)
      const data = await res.data;
      console.log(data.Answer);
      if (data.Answer === "User created") {
        setLoginData(true)
        Swal.fire({
          icon: 'success',
          title: 'Registered user',
          showConfirmButton: false,
          timer: 2000
        })
        
        registered()
      }
    }
    catch(e){
      console.log(e);
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  return (<div className="formContainer">
    {registerForm ? 
    <form onSubmit={handleSubmit(registration)}>
      <h4 className="landingName">Introduce tus datos</h4>
      <TextField name="nickname" {...register("nickname")} placeholder="Nickname  " />
      <p>{errors.nickname?nicknameError:null}</p>
      <TextField name="email" {...register("email")} placeholder="Email  " />
      <TextField name="password" type={passwordShown ? "text" : "password"} {...register("password")} placeholder="Password" />
      <TextField name="passwordRepeat" type={passwordShown ? "text" : "password"} placeholder="Repite password" />
      <Button id={registerForm ?"visibilityRegister":"visibility"} onClick={togglePassword}><img id="eye" src={passwordShown ? openEye : closedEye} alt="eye" /></Button>
      <Button type="submit" variant="contained">Submit</Button>
      <p id="registerP">Para loguearte, click <Button onClick={toggleRegister}><p>aquí</p></Button></p>
    </form>

      : <form onSubmit={handleSubmit(loginValidation)}>
        <h4 className="landingName">Introduce tus credenciales</h4>
        <TextField name="email" {...register("email")} placeholder="Email  " />
        <TextField name="password" type={passwordShown ? "text" : "password"} {...register("password")} placeholder="Password  " />
        <Button id={registerForm ?"visibilityRegister":"visibility"} onClick={togglePassword}><img id="eye" src={passwordShown ? openEye : closedEye} alt="eye" /></Button>
        <Button type="submit" variant="contained">Submit</Button>
        <p id="registerP">Si aun no tienes cuenta, click <Button onClick={toggleRegister}><p>aquí</p></Button></p>
      </form>}
  </div>)
}


export default Login;
