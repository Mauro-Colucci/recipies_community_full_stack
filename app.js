const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const flash = require('connect-flash')
//this one should be deprecated inside express-session . check docs
const cookieParser = require('cookie-parser')

const app = express()
const routes = require('./server/routes/recipeRoutes.js')
const PORT = process.env.PORT || 3000

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true })
        console.log(`mongodb connected: ${conn.connection.name}`)
    } catch (error) {
        console.log(error.message)
    }
}

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser('CookingBlogSecure'))
app.use(session({
    secret: "use a secret key of whatever",
    saveUninitialized: true,
    resave: true
}))
app.use(flash())
app.use(fileUpload())

app.use('/', routes)




app.listen(PORT, ()=> {
    connectDB()
    console.log(`server up on http://localhost:${PORT}`)
})