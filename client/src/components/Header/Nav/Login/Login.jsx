import React, { useContext, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import loginSound from '../../../../assets/sounds/login complete.wav'
import axios from 'axios';
import { loginContext } from '../../../../context/loginContext'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import bcrypt from 'bcryptjs'
import useSound from 'use-sound';
import closedEye from '../../../../assets/closedEye.png'
import openEye from '../../../../assets/openEye.png'
import registeredUser from '../../../../assets/sounds/registeredUser.wav'
import jwt_decode from "jwt-decode";

import Register from './Register'



// const regex = ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$



const Login = (props) => {

  const close = props.close

  const { setLoginData } = useContext(loginContext)

  const [passwordShown, setPasswordShown] = useState(false);
  const [registerForm, setRegisterForm] = useState(false)

  const [loginError, setLoginError] = useState(false)
  const [change] = useSound(loginSound, { volume: 0.5 });
  const [registered] = useSound(registeredUser, { volume: 0.5 });


  const [userGoogle, setUserGoogle] = useState({})

  const pruebaEmail = {
    "email": "cristinafoh001@gmail.com"
  }




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

  function passRecoverModal(){
    close()
    Swal.fire({
      title: 'Introduce tu correo electrónico',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Send it!',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        const jsonEmail = {
          "email": `${email}`
        }
        return axios.post("https://sleepy-retreat-77024.herokuapp.com/api/mailrecover", jsonEmail)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Contraseña de recuperación enviada"
        })
      }
    })
  }



  async function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    const res = await axios.get(`https://sleepy-retreat-77024.herokuapp.com/api/users?email=${userObject.email}`)
    const data = await res.data;
    if (res.data.length === 0) {
      console.log(userObject);
      setUserGoogle(userObject)
        const hash = await bcrypt.hash(userObject.jti, 10)
    
        const userCrypt = {
          nickname: userObject.name,
          email: userObject.email,
          password: hash
        }

        try{
          
          const res = await axios.post("https://sleepy-retreat-77024.herokuapp.com/api/users/create", userCrypt)
          console.log(res);
          const data = await res.data;
          console.log(data.Answer);
          if (data.Answer === "User created") {
            registered()            
            setLoginData(true)
            Swal.fire({
              icon: 'success',
              title: 'Registered user',
              showConfirmButton: false,
              timer: 3000
            })

          }
        }
        catch(e){
          console.log(e);
        }      
        
    
    }
    else{
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

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "741529201651-87iqkt4276347cbbfvc4vd5mh3mpiufv.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "dark", size: "large" }
    )
  }, [])



  const loginValidation = async (user) => {

    console.log(user);
    try {

      const res = await axios.get(`https://sleepy-retreat-77024.herokuapp.com/api/users?email=${user.email}`)
      const data = await res.data;
      console.log(res.data.length);
      if (res.data.length === 0) {
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
      if (res.data.length === 0) {
        setLoginError(true)
        console.log(loginError);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const sendForm = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const user = { email, password }

    loginValidation(user)
  }





  return (<div className="formContainer">
    {registerForm ? <Register /> :
      <form onSubmit={sendForm}>
        <h4 className="landingName">Introduce tus credenciales</h4>
        {loginError ? <p className="pError">Email o contraseña incorrectos</p> : null}
        <TextField className="loginInput" name="email" placeholder="Email  " />
        <div>
          <TextField className="loginInput" name="password" type={passwordShown ? "text" : "password"} placeholder="Password  " />
          <Button id={registerForm ? "visibilityRegister" : "visibility"} onClick={togglePassword}><img id="eye" src={passwordShown ? openEye : closedEye} alt="eye" /></Button>
        </div>
        <Button className="loginInput" type="submit" variant="contained">Submit</Button>
        <p id="registerP">Si aun no tienes cuenta, click <Button onClick={toggleRegister}><p>aquí</p></Button></p>
        <p id="recoverP">¿Olvidaste la contraseña?<Button onClick={passRecoverModal} ><p>Recuperar</p></Button></p>
        <div id="signInDiv"></div>
      </form>}
  </div>)
}


export default Login;
