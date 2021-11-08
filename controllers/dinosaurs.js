const express = require('express')
const router = express.Router()
fs = require('fs')



//index route
router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter((dino)=> {
           return dino.name.toLowerCase() === nameFilter.toLocaleLowerCase()
        })
    }
    res.render('dinosaurs/index.ejs', {dinoData: dinoData})
})

//NEW ROUTE
router.get('/new', (req, res)=> {
    res.render('dinosaurs/new.ejs')
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})

//edit dino 
router.get('/edit/:idx', (req, res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})

//update a dino
router.put('/:idx', (req, res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

//show route
router.get('/:idx', (req, res)=> {
    // get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //get array index from url parameter
    let dinoIndex = req.params.idx
    console.log(dinoData[dinoIndex])

    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

//post route
router.post('/', (req, res)=> {
    //get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //add new dino into dinoData
    dinoData.push(req.body)

    //save updated dino data to json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
    console.log(req.body)
})

router.delete('/:idx', (req, res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //remove the deleted dinosar from the dinosarus array
    dinoData.splice(req.params.idx, 1)

    //save to json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})


module.exports = router