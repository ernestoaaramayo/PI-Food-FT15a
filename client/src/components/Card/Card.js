import React from "react";
import { NavLink } from "react-router-dom";
export default function Card({ title, image, id, diets }) {
   return (
   <div>
      <div>
         <NavLink to={`/detail/${id}`}>
            <h2>{title}</h2>
         </NavLink>
      </div>
      <h3>{diets}</h3>
      <img src={image} alt="img not found" width="200px" height="250px" />
   </div>
  );
};