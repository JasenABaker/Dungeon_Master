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

router.get('/:PlayerId/delete', (req, res)=>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const PlayerId = req.params.PlayerId

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        const adventure = Dm.adventure.id(AdvenId)
        adventure.players.id(PlayerId).remove()

        return Dm.save()
    })
    .then(()=>{
        res.redirect(`/Dm/${DmId}/adventures/${AdvenId}/players`)
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

router.post('/', (rea, res)=>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const newPlayer = req.body

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        const adventure = Dm.adventure.id(AdvenId)
        adventure.players.push(newPlayer)

        return Dm.save()
    })
    .then(()=>{
        res.redirect(`/Dm/${DmId}/adventures/${AdvenId}/players`)
    })
    .catch((err)=>{
        console.log(err)
    })
})












module.exports = router