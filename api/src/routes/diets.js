const axios = require ('axios');
const express = require ('express');
const { Diet } = require('../db');
const router = express.Router();
require('dotenv').config();

const diets = [
    'gluten free',
    'ketogenic',
    'lacto ovo vegetarian',
    'vegan',
    'pescatarian',
    'paleolithic',
    'primal',
    'whole30',
    'fodmap friendly',
    'dairy free',
];

router.get ('/', async(req, res, next) => {
    try{
        diets.forEach(async (aux) => {
        await Diet.findOrCreate({where:{name: aux}})
        })
        let dietas = await Diet.findAll({attributes: ['name']});
        res.send(dietas);
    } catch(e) {
        next('no hay dietas')
    }
});

module.exports = router;