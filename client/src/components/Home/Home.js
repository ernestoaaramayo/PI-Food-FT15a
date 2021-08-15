import React from "react";
import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getDiets, filterByOrigin, filterByDiet, orderByName, orderByScore } from "../../actions";
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import Paginado from '../Paginado/Paginado';
import './Home.css';

export default function Home() {
   let allRecipes = useSelector(state => state.recipes)
   let diets = useSelector(state => state.diets)
   const dispatch = useDispatch();
   useEffect(() => {
         dispatch(getDiets())
         dispatch(getAllRecipes())
      }, []
   );

   const [orden, setOrden] = useState('')
   const [currentPage, setCurrentPage] = useState(1);
   const [recipesPerPage, setRecipesPerPage] = useState(9);
   const indexOfLastRecipe = currentPage * recipesPerPage;
   const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
   const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)
   const paginado = (pageNumber) => {setCurrentPage(pageNumber)};

   const handleFilterByOrigin = (e) => {
      dispatch(filterByOrigin(e.target.value));
   };

   const handleFilterByDiet = (e) => {
      dispatch(filterByDiet(e.target.value));
   };

   function handleSortByScore(e){
      e.preventDefault();
      dispatch(orderByScore(e.target.value));
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`)
   }

   function handleSortByName (e) {
      e.preventDefault();
      dispatch(orderByName(e.target.value))
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`)
   };

   return (
      <div className='container'>
         <div className='wallpaper'></div>
         <NavBar className='barra'></NavBar>
         <div className='cosas'>
            <select onChange={e => handleFilterByDiet(e)}>
               <option value="">Tipo de Dieta</option>
               <option value="all">Todas</option>
               {diets.map ((e) => {
                  return(
                     <option value={e.name}>{e.name}</option>
                  )}
               )}
            </select>
            <select onChange={e => handleFilterByOrigin(e)} >
               <option value="">Origen</option>
               <option value="all">Todas</option>
               <option value="db">Base de Datos</option>
               <option value="api">Api</option>
            </select>
            <select onChange={e => handleSortByName(e)} >
               <option value="">Ordenar</option>
               <option value="asc">A-Z</option>
               <option value="desc">Z-A</option>
            </select>
            <select onChange={e => handleSortByScore(e)} >
               <option value="">Puntuación</option>
               <option value="asc">Ascendente</option>
               <option value="desc">Descendente</option>
            </select>
            <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}/>
         </div>
         <div>
            <SearchBar/>
         </div>
         <div>
            {currentRecipes.map ((e) => 
               <Card 
                  title={e.title} 
                  image={e.image} 
                  diets={!e.hasOwnProperty('createdInDb') ? 
                     e.diets.map(f => f + '\n') : 
                     e.diets.map(f => f.name + '\n')} 
                  id={e.id}
                  spoonacularScore={e.spoonacularScore}
               />
            )}
         </div>
      </div>
   )
};