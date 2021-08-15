import React from 'react';
import './Paginado.css';

export default function Paginado ({recipesPerPage, allRecipes, paginado}) {
   const pageNumbers = [];
   for(let i=1; i<=Math.ceil(allRecipes / recipesPerPage); i++){
      pageNumbers.push(i);
   };
   return(
         <nav>
            <div className='paginado'>
               {pageNumbers && pageNumbers.map(e => (
                  <button className='number' key={e} onClick={() => paginado(e)}> 
                     {e}
                  </button>
               ))}
            </div>
         </nav>
   );
};