const Category = require('../models/Category')
const Recipe = require('../models/Recipe')

//get homepage

exports.homepage = async(req, res)=> {
    try {
        const limitNumber = 5
        const categories = await Category.find().limit(limitNumber)
        
        const latest = await Recipe.find().sort({_id: -1}).limit(limitNumber)

        const food = { latest }

        res.render('index', {title: 'CB - Home', categories, food})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


exports.exploreCategories = async(req, res)=> {
    try {
        const limitNumber = 20
        const categories = await Category.find().limit(limitNumber)
        res.render('categories', {title: 'CB - Categories', categories})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
