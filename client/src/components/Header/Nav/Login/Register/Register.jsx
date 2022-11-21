import React, {useState, useEffect, useContext} from 'react'
import useSound from 'use-sound';
import closedEye from '../../../../../assets/closedEye.png'
import openEye from '../../../../../assets/openEye.png'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import bcrypt from 'bcryptjs'
import { loginContext } from '../../../../../context/loginContext'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import registeredUser from '../../../../../assets/sounds/registeredUser.wav'
import Login from '../../Login'
import useRegister from '../../../../../hooks/useRegister'

function Register(props) {

  const schema = yup.object({
    nickname: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string(),
  }).required();

  const { setLoginData } = useContext(loginContext)


  const [passwordShown, setPasswordShown] = useState(false);
  const [registerForm, setRegisterForm] = useState(true)

  const [registerError, setRegisterError] = useState(false)

  const [repPasswordError, setRepPasswordError] = useState(false)

  const nicknameError = 'El nickname es requerido y es necesario que contenga 3 o más caracteres'
  const passwordError = 'La password debe contener al menos una mayúscula, una minúscula, un número y un símbolo'
  const emailError = 'El email debe contener un formato correcto'


  const [registered] = useSound(registeredUser, { volume: 0.5 });


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

  return (
    <div>
      {registerForm?<form onSubmit={handleSubmit(registration)}>
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
    </form>:<Login/>}
    </div>
  )
}

export default Register
