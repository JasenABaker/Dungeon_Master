const express = require('express');
const router = express.Router({ mergeParams: true });

const DungeonMaster = require('../db/models/Dm')
const Adventure = require('../db/models/Adventure')

router.get('/', (req, res) => {
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId


    DungeonMaster.findById(DmId)
        .then((Dm) => {
            const adventure = Dm.adventures.id(AdvenId)
            const players = adventure.players

            res.render('players/index', {
                DmId,
                AdvenId,
                adventure,
                players,
                title: 'Players'
            })
        })
})

router.get('/new', (req, res) => {
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId

    DungeonMaster.findById(DmId)
        .then((Dm) => {
            const adventure = Dm.adventures.id(AdvenId)
            res.render('players/new', {
                Dm,
                DmId,
                AdvenId,
                adventure,
                title: 'Add Player to:'
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/:PlayerId/edit', (req, res) => {
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const PlayerId = req.params.PlayerId

    DungeonMaster.findById(DmId)
        .then((Dm) => {
            const adventure = Dm.adventures.id(AdvenId)
            const player = adventure.players.id(PlayerId)
            res.render('players/edit', {
                DmId,
                adventure,
                player,
                PlayerId,
                title: 'Edit'
            })
        })
        .catch((err) => {
            console.log(err)
        })

})

router.get('/:PlayerId/delete', (req, res) => {
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const PlayerId = req.params.PlayerId

    DungeonMaster.findById(DmId)
        .then((Dm) => {
            const adventure = Dm.adventures.id(AdvenId)
            adventure.players.id(PlayerId).remove()

            return Dm.save()
        })
        .then(() => {
            res.redirect(`/Dm/${DmId}/adventures/${AdvenId}/players`)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.post('/', (req, res) => {
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const newPlayer = req.body

    DungeonMaster.findById(DmId)
        .then((Dm) => {
            const adventure = Dm.adventures.id(AdvenId)
            adventure.players.push(newPlayer)

            return Dm.save()
        })
        .then(() => {
            res.redirect(`/Dm/${DmId}/adventures/${AdvenId}/players`)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.put('/:PlayerId', (req, res) => {
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const PlayerId = req.params.PlayerId
    const updatedPlayer = req.body

    DungeonMaster.findById(DmId)
        .then((Dm) => {
            const adventure = Dm.adventures.id(AdvenId)
            adventure.players.id(PlayerId).remove()

            return Dm.save()
        })
        .then((Dm) => {
            const adventure = Dm.adventures.id(AdvenId)
            adventure.players.push(updatedPlayer)
            return Dm.save()
        })
        .then(() => {
            res.redirect(`/Dm/${DmId}/adventures/${AdvenId}/players`)
        })
        .catch((err) => {
            console.log(err)
        })
})













module.exports = router