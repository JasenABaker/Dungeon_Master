const express = require('express');
const router = express.Router({mergeParams: true});

const DungeonMaster = require('../db/models/Dm')
const Adventure = require('../db/models/Adventure')

router.get('/', (req, res)=>{
    const DmId = req.params.DmId

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        res.render('adventures/index', {
            Dm,
            adventures: Dm.adventures,
            DmId: Dm._id,
            title:  'Adventures'
        })
    }).catch((err)=>{
        console.log(err)
    })

})

router.get('/new', (req,res)=>{
    const DmId = req.params.DmId
    res.render('adventures/new', {
        DmId,
        title: 'New Adventure'
    })
})


router.post('/', (req,res)=>{
    const DmId = req.params.DmId
    const newAdventure = req.body

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        Dm.adventures.push(newAdventure)
        return Dm.save()
    })
    .then(() =>{
        res.redirect(`/Dm/${DmId}/adventures`)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get('/:AdvenId', (req,res) => {
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId

    DungeonMaster.findById(DmId)
    .then((Dm) =>{
        const adventure = Dm.adventures.id(AdvenId)
        
        res.render('adventures/show', {
            DmId,
            adventure,
            title: `${adventure.name}`
        })
    
    }).catch((err)=>{
        console.log(err)
    })
})

router.get('/:AdvenId/edit', (req,res)=>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId

    DungeonMaster.findById(DmId)
    .then((Dm) =>{
        const adventure = Dm.adventures.id(AdvenId)

        res.render('adventures/edit', {
            DmId,
            adventure,
            title: `${adventure.name}`
        })
    })
})

router.get('/:AdvenId/delete', (req, res)=>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        Dm.adventures.id(AdvenId).remove()
        return Dm.save()
    })
    .then(()=>{
        res.redirect(`/Dm/${DmId}/adventures`)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.put('/', (req, res)=>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const updatedAdven = req.body

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        Dm.adventures.id(AdvenId).remove()
        return Dm.save()
    })
    .then((Dm)=>{
        Dm.adventures.push(updatedAdven)
        return Dm.save()
    })
    .then (()=>{
        res.redirect(`/Dm/${DmId}/adventures`)
    })
    .catch((err)=>{
        console.log(err)
    })
})









module.exports = router