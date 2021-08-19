import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css';

export default function NavBar(){
   return(
      <div className="navbar">
         <li><NavLink className='link' exact to="/">Inicio</NavLink></li>
         <li><NavLink className='link' to="/home">Home</NavLink></li>
         <li><NavLink className='link' to="/create">Create</NavLink></li>
      </div>
   );
};