import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, createRecipe } from '../../actions/index';
import NavBar from "../NavBar/NavBar";
import './Create.css';


export default function Create() {
   const dispatch = useDispatch();
   let diets = useSelector(state => state.diets)
   React.useEffect(() => {
         dispatch(getDiets())
      },
      []
   );

   const [input, setInput] = React.useState({
      title: '',
      summary: '',
      spoonacularScore: '',
      healthScore: '',
      stepByStep: '',
      diets: [],
   });

   const handleInputChange = function(e) {
      setInput({
         ...input,
         [e.target.name]: e.target.value
      });
   };

   const handleOnSubmit = (e) => {
      e.preventDefault();
      dispatch(createRecipe(input))
      alert('Receta creada!')
      setInput({
         title: '',
         summary: '',
         spoonacularScore: '',
         healthScore: '',
         stepByStep: '',
         diets: [],
      })
   };

   // borrar las dietas en pantalla
   // function handleReset(e) {
   //    setInput({
   //       ...input,
   //       diets: [],
   //    })
   // }

   function handleSelect(e) {
      setInput({
         ...input,
         diets: [...input.diets, e.target.value]
      })
   }

   let calificacion = [];
   for(let i=0; i<100; i++){
      calificacion.push(i+1);
   }
   return(
      <div className='createContainer'>
         <NavBar></NavBar>
         <form onSubmit={(e)=>handleOnSubmit(e)} className='form'>
            <h1 className='header'>Crea tu propia receta!</h1>
            <div className='title'>
               <label>Título: </label>
               <br/>
               <input  type= "text" value= {input.title} name= "title" onChange={(e)=>handleInputChange(e)}/>
            </div>
            <div className='summary'>
               <label>Resumen: </label>
               <br/>
               <input  type= "text" value= {input.summary} name= "summary" onChange={(e)=>handleInputChange(e)}/>
            </div>
            <div className='select'>
               <label>Puntuación: </label>
               <br/>
               <select  type="number" name='spoonacularScore' value= {input.spoonacularScore} onChange={(e)=>handleInputChange(e)}>
                  {calificacion.map((e) => (<option value={e}>{e}</option>))}
               </select>
            </div>
            <div className='select'>
               <label>Nivel de comida saludable: </label>
               <br/>
               <select  type="number" name='healthScore' value= {input.healthScore} onChange={(e)=>handleInputChange(e)}>
                  {calificacion.map((e) => (<option value={e}>{e}</option>))}
               </select>
            </div>
            <div className='select'>
               <label>Dietas: </label>
               <br/>
               <select  onChange={(e) => handleSelect(e)}>
                  {diets.map((g) => (<option value={g.name}>{g.name}</option>))}
               </select>
            </div>
            <ul className='dietas'>{input.diets.map(e => <li>{e}</li>)}</ul>
            {/* <button type="reset" value="Restaurar">Restaurar</button> */}
            <br/>
            <button className='button' type='submit'>Crear receta</button>​
         </form>
      </div>
   )
}