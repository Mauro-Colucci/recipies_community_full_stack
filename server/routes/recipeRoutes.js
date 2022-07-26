const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController')


//app route

router.get('/', recipeController.homepage)
router.get('/categories', recipeController.exploreCategories)


module.exports = router