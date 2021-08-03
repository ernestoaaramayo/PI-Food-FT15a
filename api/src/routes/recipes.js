const axios = require ('axios');
const express = require ('express');
const router = express.Router();
require('dotenv').config();


const {API_KEY} = process.env;
const Url = `https://api.spoonacular.com/recipes/`
// const UrlID = `https://api.spoonacular.com/recipes/`


//traer receta por nombre
router.get('/', async (req, res) => {
   let title = req.query.title;
   let infoTitle = await axios.get(`${Url}complexSearch?query=${title}&apiKey=${API_KEY}`);
   res.send(infoTitle.data.results);
})

//traer receta por id
// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso
router.get('/:id', async (req, res, next) => {
   let id = req.params.id;
   if (id) {
      try {
         let info = await axios.get(`${Url}${id}/information?apiKey=${API_KEY}&includeNutrition=false`);
         if (info.data !== null) {
            let infoDetail = {
               img: info.data.image,
               name: info.data.title,
               dish_type: info.data.dishTypes,
               diet_type: info.data.diets,
               resume: info.data.summary,
               punctuation: info.data.spoonacularScore,
               level: info.data.healthScore,
               step_by_step: info.data.instructions,
            };
            res.send(infoDetail);
         };
      } catch(e) {
         next('gil')
      }
   }
});

module.exports = router;