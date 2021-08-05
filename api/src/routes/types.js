const axios = require ('axios');
const express = require ('express');
const { Diet } = require('../db');
const router = express.Router();
require('dotenv').config();

const diets = [
    'gluten_free',
    'ketogenic',
    'vegetarian',
    'lacto-vegetarian',
    'ovo-vegetarian',
    'vegan',
    'pescetarian',
    'paleo',
    'primal',
    'whole30',
];

router.get ('/', async(req, res, next) => {
    diets.forEach(async (aux) => {
        await Diet.findOrCreate({where:{name: aux}})
    })
    let dietas = await Diet.findAll({attributes: ['name']});
    res.send(dietas);
});

module.exports = router;