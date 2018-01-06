const express = require('express');
const router = express.Router({mergeParams: true});

const DungeonMaster = require('../db/models/Dm')
const Adventure = require('../db/models/Adventure')

router.get('/', (req, res) =>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        const adventure = Dm.adventures.id(AdvenId)
        const players = adventure.players

        res.render('players/index', {
            DmId,
            adventure,
            players,
            title: 'Players'
        })
    })
})

router.get('/new', (req, res) =>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        const adventure = Dm.adventure.id(AdvenId)
        res.render('players/new', {
            DmId,
            adventure,
            title: 'Add Player to:'
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})









module.exports = router