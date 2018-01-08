const express = require('express');
const router = express.Router({ mergeParams: true });

const DungeonMaster = require('../db/models/Dm')


router.get('/', (req, res) => {
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const EncountId = req.params.EncountId

    DungeonMaster.findById(DmId)
        .then((Dm) => {
            const adventure = Dm.adventures.id(AdvenId)
            const encounter = adventure.encounters.id(EncountId)
            const monsters = encounter.monsters

            res.render('monsters/index', {
                Dm,
                DmId,
                AdvenId,
                adventure,
                encounter,
                EncountId,
                monsters,
                title: 'Monsters'
            })

        })
        .catch((err) => {
            console.log(err)
        })

})

router.get('/new', (req, res) => {
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const EncountId = req.params.EncountId

    DungeonMaster.findById(DmId)
        .then((Dm) => {
            const adventure = Dm.adventures.id(AdvenId)
            const encounter = adventure.encounters.id(EncountId)

            res.render('monsters/new', {
                Dm,
                DmId,
                AdvenId,
                adventure,
                encounter,
                title: 'Add Monster to:'
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/:MonstId/edit', (req, res)=>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const EncountId = req.params.EncountId
    const MonstId = req.params.MonstId

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        const adventure = Dm.adventures.id(AdvenId)
        const encounter = adventure.encounters.id(EncountId)
        const monster = encounter.monsters.id(MonstId)

        res.render('monsters/edit', {
            DmId,
            adventure,
            AdvenId,
            encounter,
            EncountId,
            monster,
            MonstId,
            title: 'Edit'

        })
    })
    .catch((err)=>{
        console.log(err)
    })

})


router.get('/:MonstId/delete', (req, res)=>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const EncountId = req.params.EncountId
    const MonstId = req.params.MonstId
    
    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        const adventure = Dm.adventures.id(AdvenId)
        const encounter = adventure.encounters.id(EncountId)
        encounter.monsters.id(MonstId).remove()
        
        return Dm.save()
    })
    .then(()=>{
        res.redirect(`/Dm/${DmId}/adventures/${AdvenId}/encounters/${EncountId}/monsters`)
    })
    .catch((err)=>{
        console.log(err)
    })

})


router.post('/', (req, res)=>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const EncountId = req.params.EncountId
    const newMonster = req.body

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        const adventure = Dm.adventures.id(AdvenId)
        const encounter = adventure.encounters.id(EncountId)
        encounter.monsters.push(newMonster)

        return Dm.save()
    })
    .then(()=>{
        res.redirect(`/Dm/${DmId}/adventures/${AdvenId}/encounters/${EncountId}/monsters`)
    })
    .catch((err)=>{
        console.log(err)
    })

})

router.put('/:MonstId', (req, res)=> {
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const EncountId = req.params.EncountId
    const MonstId = req.params.MonstId
    const updatedMonster = req.body

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        const adventure = Dm.adventures.id(AdvenId)
        const encounter = adventure.encounters.id(EncountId)
        encounter.monsters.id(MonstId).remove()

        return Dm.save()
    })
    .then((Dm)=>{
        const adventure = Dm.adventures.id(AdvenId)
        const encounter = adventure.encounters.id(EncountId)
        encounter.monsters.push(updatedMonster)

        return Dm.save()
    })
    .then(()=> {
        res.redirect(`/Dm/${DmId}/adventures/${AdvenId}/encounters/${EncountId}/monsters`)
    })
    .catch((err)=>{
        console.log(err)
    })
})





module.exports = router