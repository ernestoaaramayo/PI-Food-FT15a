const axios = require ('axios');
const express = require ('express');
const router = express.Router();
require('dotenv').config();
const {Recipe, Diet} = require ('../db');

const {API_KEY} = process.env;
const Url = `https://api.spoonacular.com/recipes/`

router.get('/', async (req, res, next) => {
   let title = req.query.title;
   if (title) {
      //trae receta por nombre
      try {
         let recipeDB = await Recipe.findAll({ 
            attributes: ['id', 'title', 'createdInDb'],
            include: {
               model: Diet, 
               attributes: ['name'], 
               through: {
                  attributes: []
               }
            }
         });
         let info = await axios.get(`${Url}complexSearch?query=${title}&apiKey=${API_KEY}&addRecipeInformation=true`);
         if (info.data.results !== null) {
            let infoHome = info.data.results.map((e) => {
               return (
                  {
                     id: e.id, 
                     image: e.image, 
                     title: e.title, 
                     diets: e.diets
                  }
               );
            });
            res.send(recipeDB.concat(infoHome))
         };
      } catch(e) {
         next(e)
      }
   } else {
      //trae 100 recetas
      try {
         let info = await axios.get(`${Url}complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
         if (info.data.results !== null) {
            let infoHome = info.data.results.map((e) => {
               return (
                  {
                     id: e.id,
                     image: e.image,
                     title: e.title,
                     diets: e.diets,
                  }
               );
            });
         let recipeDB = await Recipe.findAll({ 
            attributes: ['id', 'title', 'createdInDb'],
            include: {
               model: Diet, 
               attributes: ['name'], 
               through: {
                  attributes: []
               }
            }
         });
         res.send(recipeDB.concat(infoHome));
         };
      } catch(e) {
         next(e);
      }
   }
})


//traer receta por id
// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso
router.get('/:id', async (req, res, next) => {
   let id = req.params.id;
   if(isNaN(id)) {
      try {
         let recipeDB = await Recipe.findOne({ 
            where:{id: id}, 
            attributes: ['id', 'title','summary','spoonacularScore', 'healthScore','stepByStep'],
            include: {
               model: Diet, 
               attributes: ['name'],
               through: {
                  attributes: []
               }
            }
         });
         res.send(recipeDB);
      } catch(e) {
         next(e)
      }
   } else {
      try {
         let info = await axios.get(`${Url}${id}/information?apiKey=${API_KEY}&includeNutrition=false`);
         if (info.data !== null) {
            let infoDetail = {
               id: info.data.id,
               img: info.data.image,
               title: info.data.title,
               dishTypes: info.data.dishTypes,
               diets: info.data.diets,
               summary: info.data.summary,
               spoonacularScore: info.data.spoonacularScore,
               healthScore: info.data.healthScore,
            };
            let infoStepByStep = info.data.analyzedInstructions.map (e => {
               return {name: e.name, steps: e.steps.map(f => f.step).join(' ')};
            });
            infoDetail.stepByStep = infoStepByStep;
            res.send(infoDetail);
         };
      } catch(e) {
         next(e)
      }
   }
});

module.exports = router;