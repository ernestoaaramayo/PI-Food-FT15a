import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from '../../actions/index';
import NavBar from "../NavBar/NavBar";
import './RecipeDetail.css';

export default function RecipeDetail(props) {
   const id = props.match.params.id;
   const dispatch = useDispatch();
   useEffect(() => {
         dispatch(getRecipeDetail(id))
      }, []
   );
   const detail = useSelector(state => state.recipeDetail);

   return (
      <div className='detailContainer'>
         <NavBar></NavBar>
         <div className='textContainer'>
            <div className='titleDetail'>{detail.title}</div>
            <div className='dietsDetail'>Diets: {!detail.createdInDb ? detail.diets + ' ': detail.diets.map(e => e.name + (' '))}</div>
            <div className='dishDetail'>Dish Type: {detail.dishTypes + ' '}</div>
            <div className='scoreDetail'>spoonacularScore: {detail.spoonacularScore}</div>
            <div className='healthDetail'>healthScore: {detail.healthScore}</div>
            <br/>
            <img className='imgDetail'src={detail.img} alt="img not found" width="250px" height="250px"/>
            <div className='summaryDetail'>Summary: {detail.summary}</div>
            <br/>
            <div className='stepDetail'>Step By Step: {detail.stepByStep}</div>
         </div>
      </div>
   );
};