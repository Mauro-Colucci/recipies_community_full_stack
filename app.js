const express = require('express')
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config()
const mongoose = require('mongoose')

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
app.use('/', routes)

//check if needed, since you can include partial sections in ejes with <%- include('layout/header') %>
/* app.use(expressLayouts)
app.set('layout', './layouts/main') */


app.listen(PORT, ()=> {
    connectDB()
    console.log(`server up on http://localhost:${PORT}`)
})