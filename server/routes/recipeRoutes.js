const express = require('express')
const router = express.Router()
const { homepage, exploreCategories, exploreRecipe, exploreCategoryById, exploreLatest, exploreRandom, submitRecipe, searchRecipe, submitRecipeOnPost } = require('../controllers/recipeController')


//app route

router.get('/', homepage)
router.get('/categories', exploreCategories)
router.get('/recipe/:id', exploreRecipe)
router.get('/categories/:id', exploreCategoryById)
router.get('/explore-latest', exploreLatest)
router.get('/explore-random', exploreRandom)
router.get('/submit-recipe', submitRecipe)

router.post('/submit-recipe', submitRecipeOnPost)
router.post('/search', searchRecipe)

module.exports = router
