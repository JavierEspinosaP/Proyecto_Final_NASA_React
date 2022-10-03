import React from "react";
import { Link } from "react-router-dom";


const Nav = () => {

    return <div className="nav">
      <Link className="nav-link" to='/'>Home</Link>
      <Link className="nav-link" to='/landings'>Landings</Link>
      <Link className="nav-link" to='/neas'>NEAS</Link>
      <Link className="nav-link" to='/login'>Login</Link>
    </div>;
  }


export default Nav;
