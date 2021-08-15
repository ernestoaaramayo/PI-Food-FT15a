import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from '../../actions/index';
import NavBar from "../NavBar/NavBar";

export default function RecipeDetail(props) {
   const id = props.match.params.id;
   const dispatch = useDispatch();
   useEffect(() => {
         dispatch(getRecipeDetail(id))
      }, []
   );
   const detail = useSelector(state => state.recipeDetail);

   return (
      <div>
         <NavBar></NavBar>
         <h2>{detail.title}</h2>
         <h3>{!detail.createdInDb ? detail.diets + ' ': detail.diets.map(e => e.name + (' '))}</h3>
         <img src={detail.img} alt="img not found" width="250px" height="250px"/>
         <h4>{detail.summary}</h4>
         <div>{detail.dishType}</div>
         <div>{detail.spoonacularScore}</div>
         <div>{detail.healthScore}</div>
         <div><h4>{detail.stepByStep}</h4></div>
      </div>
   );
};