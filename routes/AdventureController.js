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









module.exports = router