const axios = require ('axios');
const express = require ('express');
const router = express.Router();
const {Recipe, Diet} = require ('../db')


router.post ('/',async (req, res, next) =>{
   let {name, resume, punctuation, level, step_by_step, diet} = req.body;
   try {
      let createdRecipe = await Recipe.create({name, resume, punctuation, level, step_by_step});
      let dieta = await Diet.findOne({where: {name: diet}})
      await createdRecipe.addDiet(dieta);
      res.send(createdRecipe);
   } catch (error) {
      next('No se creo la receta');
   };
});

module.exports = router;