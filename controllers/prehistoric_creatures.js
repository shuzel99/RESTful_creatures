const express = require('express')
const router = express.Router()
fs = require('fs')

//index route
router.get('/', (req, res)=> {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    console.log(creaturesData)
    res.render('prehistoric_creatures/index.ejs', {creaturesData: creaturesData})
})

//new route
router.get('/new', (req, res)=> {
    res.render('prehistoric_creatures/new.ejs')
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    res.render('creatures/edit.ejs', {creaturesId: req.params.idx, creatures: creaturesData[req.params.idx]})
})


//show route
router.get('/:idx', (req, res)=> {
    // get creatures
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    //get array index from url parameter
    let creaturesIndex = req.params.idx
    console.log(creaturesData[creaturesIndex])

    res.render('prehistoric_creatures/show.ejs', {creatures: creaturesData[creaturesIndex]})
})
 
//post route
router.post('/', (req, res)=> {
    //get creatures array
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)

    //add new creature into creatureData
    creaturesData.push(req.body)

    //save updated creatures data to json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    res.redirect('/prehistoric_creatures')
    console.log(req.body)
})

//delete route
router.delete('/:idx', (req, res)=> {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)

    //remove the deleted dinosar from the dinosarus array
    creaturesData.splice(req.params.idx, 1)

    //save to json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))

    res.redirect('/prehistoric_creatures')
})

















module.exports = router