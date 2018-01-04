const express = require('express');
const router = express.Router();

const DungeonMaster = require('../db/models/Dm')


router.get('/', (req,res) =>{
    DungeonMaster.find()
    .then((DMs)=>{
        res.render('dm/index', {
            DMs,
            title: 'Dungeon Masters'
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get('/new', (req,res) =>{
    res.render('Dm/new', { title: 'New Dungeon Master'})
})

router.get('/:DmId', (req,res)=>{
    const DmId = req.params.DmId

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        res.render('dm/show', {
            DmId,
            Dm,
            title: `${Dm.username}`
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})











module.exports = router