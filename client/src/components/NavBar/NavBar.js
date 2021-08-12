import React from 'react';
import {NavLink} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar(){
   return(
      <div className="navbar">
         <nav>
            <ul>
               <li><NavLink className="link" exact to="/">Inicio</NavLink></li>
               <li><NavLink className="link" to="/home">Home</NavLink></li>
               <li><NavLink className="link" to="/create">Create</NavLink></li>
               <li><SearchBar></SearchBar></li>
            </ul>
         </nav>
      </div>
   );
};