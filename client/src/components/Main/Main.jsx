import React from "react";
import {Route, Routes} from 'react-router-dom'
import Home from './Home'
import Landings from './Landings'
import LandingsList from './Landings/LandingsList'
import NEAS from './NEAS'
import Login from '../Header/Nav/Login'
import Payments from '../Main/Payments'

const Main = () => {

    return <div>
       <Routes>
        <Route element={<Home/>} path={"/"}/>        
        <Route element={<Landings/>} path={"/landings"}/>
        <Route element={<LandingsList/>} path={"/landings/list"}/>
        <Route element={<NEAS/>} path={"/neas"}/>
        <Route element={<Login/>} path={"/login"}/>
        <Route element={<Payments/>} path={"/payments"}/>
      </Routes>
    </div>;
  }


export default Main;
