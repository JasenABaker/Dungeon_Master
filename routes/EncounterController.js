const express = require('express');
const router = express.Router({mergeParams: true});

const DungeonMaster = require('../db/models/Dm')
const Adventure = require('../db/models/Adventure')

router.get('/', (req, res)=>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId

    DungeonMaster.findById(DmId)
        .then((Dm) => {
            const adventure = Dm.adventures.id(AdvenId)
            const encounters = adventure.encounters

            res.render('encounters/index', {
                Dm,
                DmId,
                AdvenId,
                adventure,
                encounters,
                title: `Encounters`
            })
        })
        .catch((err)=>{
            console.log(err)
        })

    
})

router.get('/:EncountId', (req, res) =>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const EncountId = req.params.EncountId

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        const adventure = Dm.adventures.id(AdvenId)
        const encounter = adventure.encounters.id(EncountId)

        res.render('encounter/show', {
            Dm,
            DmId,
            AdvenId,
            adventure,
            encounter,
            title: `${encounter.location}`
        })

    })
    .catch((err)=>{
        console.log(err)
    })
    
})









module.exports = router