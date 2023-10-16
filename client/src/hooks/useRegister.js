import React, {useState, useContext} from 'react'
import axios from 'axios';
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import useSound from 'use-sound';
import registeredUser from '../assets/sounds/registeredUser.wav'
import { loginContext } from '../context/loginContext'




 async function useRegister(user){


const { setLoginData } = useContext(loginContext)    

const [registerError, setRegisterError] = useState(false)

const [repPasswordError, setRepPasswordError] = useState(false)

const [registered] = useSound(registeredUser, { volume: 0.5 });

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
      const res = await axios.post("https://nasa-app-fzbq.onrender.com/api/users/create", userCrypt)
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

  export default useRegister