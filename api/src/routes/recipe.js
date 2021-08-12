const axios = require ('axios');
const express = require ('express');
const router = express.Router();
const {Recipe, Diet} = require ('../db')


router.post ('/',async (req, res, next) =>{
   let {title, summary, spoonacularScore, healthScore, stepByStep, diets} = req.body;
   try {
      let createdRecipe = await Recipe.create({title, summary, spoonacularScore, healthScore, stepByStep});
      let dieta = await Diet.findOne({where: {name: diets}})
      await createdRecipe.addDiet(dieta);
      res.send(createdRecipe);
   } catch (e) {
      next('No se creo la receta');
   };
});

module.exports = router;