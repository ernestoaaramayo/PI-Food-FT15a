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
         <h3>{detail.diets}</h3>
         <img src={detail.img} alt="img not found" width="250px" height="250px"/>
         <div>{detail.dishType}</div>
         <h4>{detail.summary}</h4>
         <div>{detail.spoonacularScore}</div>
         <div>{detail.healthScore}</div>
         <div>
            {detail.stepByStep.map(e => {
               return(
                  <div>
                     <h3>{e.name}</h3>
                     <h4>{e.steps}</h4>
                  </div>
               )
            })}
         </div>
      </div>
   );
};