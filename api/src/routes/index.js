const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require ('./recipes')
const recipeRouter = require ('./recipe')
const dietsRouter = require ('./diets')


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);
router.use('/recipe', recipeRouter);
router.use('/diets', dietsRouter);

//yo

module.exports = router;
