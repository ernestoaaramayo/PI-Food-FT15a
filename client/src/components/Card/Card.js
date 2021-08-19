import React from "react";
import { NavLink } from "react-router-dom";
import './Card.css';

export default function Card({ title, image, id, diets, spoonacularScore }) {
   return (
   <div className='box'>
         <NavLink className='link' to={`/detail/${id}`}>
            <h2 className='titleCard'>{title}</h2>
         </NavLink>
      <img className='image' src={image} alt="img not found" width="200px" height="250px" />
      <h3 className='diets'>{diets + ' '}</h3>
   </div>
  );
};