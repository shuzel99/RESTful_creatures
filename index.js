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




 //<-----------------------------End of Dino Stuff--------------------------------------------->>
//display prehistoric creatures
app.get('/prehistoric_creatures', (req, res)=> {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    console.log(creaturesData)
    res.render('prehistoric_creatures/index', {creatures: creaturesData})
})












app.listen(3000, ()=> {
    console.log("Hello out therrrrrreee!!")
})