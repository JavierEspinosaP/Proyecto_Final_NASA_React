import React, { useContext,  useEffect, useState } from "react";
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


// const regex = ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$

const schema = yup.object({
  nickname: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string(),
}).required();

const Login = (props) => {

  const close = props.close

  const { setLoginData } = useContext(loginContext)

  const [passwordShown, setPasswordShown] = useState(false);
  const [registerForm, setRegisterForm] = useState(false)

  const [registerError, setRegisterError] = useState(false)

  const [loginError, setLoginError] = useState(false)

  const [repPasswordError, setRepPasswordError] = useState(false)




  const nicknameError = 'El nickname es requerido y es necesario que contenga 3 o más caracteres'
  const passwordError = 'La password debe contener al menos una mayúscula, una minúscula, un número y un símbolo'
  const emailError = 'El email debe contener un formato correcto'

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

      console.log(user);    
    try {

      const res = await axios.get(`https://sleepy-retreat-77024.herokuapp.com/api/users?email=${user.email}`)
      const data = await res.data;
      console.log(res.data.length);
      if (res.data.length===0) {
        setLoginError(true)
        console.log(loginError);
      }
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
      if (res.data.length===0) {
        setLoginError(true)
        console.log(loginError);
      }
    }
    catch(e){
      console.log(e);
    }
  }

  const sendForm = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const user = {email, password}

    loginValidation(user)
  }

  const registration = async (user) => {

    const hash = await bcrypt.hash(user.password, 10)

    const userCrypt = {
      nickname: user.nickname,
      email: user.email,
      password: hash
    }


    console.log(userCrypt);
    console.log(user.passwordRepeat);
    if (user.password == user.passwordRepeat) {
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
          timer: 3000
        })

        
        registered()
      }
    else{
      setRegisterError(true)
    }
    }
    catch(e){
      console.log(e);
    }      
    }
    else{
      setRepPasswordError(true)
    }

  }

  const { register, handleSubmit, formState: { errors } } = useForm(
    {resolver: yupResolver(schema)});

  return (<div className="formContainer">
    {registerForm ? 
    <form onSubmit={handleSubmit(registration)}>
      <h4 className="landingName">Introduce tus datos</h4>
      {registerError?<p className="pError">El email introducido ya está en uso</p>:null}
      <TextField className="registerInput" name="nickname" {...register("nickname")} placeholder="Nickname  " />
      <p className="pError">{errors.nickname?nicknameError:null}</p>
      <TextField className="registerInput" name="email" {...register("email")} placeholder="Email  " />
      <p className="pError">{errors.email?emailError:null}</p>
      <div>
      <TextField className="registerInput" name="password" type={passwordShown ? "text" : "password"} {...register("password")} placeholder="Password" />
      <Button id={registerForm ?"visibilityRegister":"visibility"} onClick={togglePassword}><img id="eye" src={passwordShown ? openEye : closedEye} alt="eye" /></Button>         
      </div>
      <p className="pError">{errors.password?passwordError:null}</p>   
      <div>
      <TextField className="registerInput" name="passwordRepeat" {...register("passwordRepeat")} type={passwordShown ? "text" : "password"} placeholder="Repite password" />    
      {repPasswordError?<p className="pError">Las contraseñas deben coincidir</p>: null}    
        </div>  
      <Button className="registerInput" type="submit" variant="contained">Submit</Button>
      <p id="registerP">Para loguearte, click <Button onClick={toggleRegister}><p>aquí</p></Button></p>
    </form>

      : <form onSubmit={sendForm}>
        <h4 className="landingName">Introduce tus credenciales</h4>
        {loginError?<p className="pError">Email o contraseña incorrectos</p>: null}        
        <TextField className="loginInput" name="email" placeholder="Email  " />
        <div>
        <TextField className="loginInput" name="password" type={passwordShown ? "text" : "password"} placeholder="Password  " />
        <Button id={registerForm ?"visibilityRegister":"visibility"} onClick={togglePassword}><img id="eye" src={passwordShown ? openEye : closedEye} alt="eye" /></Button>          
        </div>
        <Button className="loginInput" type="submit" variant="contained">Submit</Button>
        <p id="registerP">Si aun no tienes cuenta, click <Button onClick={toggleRegister}><p>aquí</p></Button></p>

      </form>}
  </div>)
}


export default Login;
