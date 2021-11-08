const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs') // able to pull all the dinosaur info from json file
const methodOverride = require('method-override')

//middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)
//body parser middleware
// makes req.body work
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))



app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.use('/dinosaurs', require('./controllers/dinosaurs.js'))

app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures.js'))



 //<-----------------------------End of Dino Stuff--------------------------------------------->>
//display prehistoric creatures




app.listen(3000, ()=> {
    console.log("Hello out therrrrrreee!!")
})