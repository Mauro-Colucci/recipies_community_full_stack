const Category = require('../models/Category')
const Recipe = require('../models/Recipe')

//get homepage

exports.homepage = async(req, res)=> {
    try {
        const limitNumber = 5
        const categories = await Category.find().limit(limitNumber)
        const latest = await Recipe.find().sort({_id: -1}).limit(limitNumber)
        const thai = await Recipe.find({'category': 'Thai'}).limit(limitNumber)
        const american = await Recipe.find({'category': 'American'}).limit(limitNumber)
        const chinese = await Recipe.find({'category': 'Chinese'}).limit(limitNumber)
        const mexican = await Recipe.find({'category': 'Mexican'}).limit(limitNumber)
        const indian = await Recipe.find({'category': 'Indian'}).limit(limitNumber)
        const spanish = await Recipe.find({'category': 'Spanish'}).limit(limitNumber)

        const food = { latest, thai, american, chinese, mexican, indian, spanish }

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

exports.exploreCategoryById = async(req, res)=> {
    try {
        const id = req.params.id;
        const limitNumber = 20
        
        const categoryById = await Recipe.find({ 'category': id}).limit(limitNumber)
        res.render('categories', {title: 'CB - Categories', categoryById})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.exploreRecipe = async(req, res)=> {
    try {
        const id = req.params.id;
        const recipe = await Recipe.findById(id)

        res.render('recipe', {title: 'CB - Recipe', recipe})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//post

exports.searchRecipe = async(req, res)=>{
    try {
        const searchTerm = req.body.searchTerm
        const recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true }})
        res.render('search', { title: 'CB - Search', recipe})
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}


//get latest

exports.exploreLatest = async(req, res)=> {
    try {
        const limitNumber = 20
        const recipe = await Recipe.find().sort({_id:-1}).limit(limitNumber)

        res.render('explore-latest', {title: 'CB - Explore latest', recipe})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


//random get

exports.exploreRandom = async(req, res)=>{
    try {
        let count = await Recipe.find().countDocuments()
        let rand = Math.floor(Math.random() * count)
        let recipe = await Recipe.findOne().skip(rand).exec()
        res.render('explore-random', {title: 'CB - Explore Random', recipe})    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


exports.submitRecipe = async(req, res)=>{
    const infoErrorsObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')
    res.render('submit-recipe', { title: 'CB - Submit recipe', infoErrorsObj, infoSubmitObj })
}

//post

exports.submitRecipeOnPost = async(req,res)=>{
    try{

        let imageUploadFile, uploadPath, newImageName

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No files where uploaded.')
        } else {
            imageUploadFile= req.files.image;
            newImageName= Date.now() + imageUploadFile.name;
            uploadPath= require('path').resolve('./') + '/public/uploads/' + newImageName

            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err)
            })
        }

        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        })
        await newRecipe.save()

        req.flash('infoSubmit', 'Recipe has been added.')
        res.redirect('/submit-recipe')
    }catch(err){
        req.flash('infoErrors', err)
        res.redirect('/submit-recipe')
    }

}



// Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'New Recipe From Form' });
//   } catch (error) {
//     console.log(error);
//   }
// }


// Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }