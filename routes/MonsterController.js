const express = require('express');
const router = express.Router({mergeParams: true});

const DungeonMaster = require('../db/models/Dm')


router.get('/', (req, res)=>{
    const DmId = req.params.DmId
    const AdvenId = req.params.AdvenId
    const EncountId = req.params.EncountId

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        const adventure = Dm.adventures.id(AdvenId)
        const encounter = adventure.encounters.id(EncountId)
        const monsters = encounter.monsters

        res.render('monsters/index', {
            Dm,
            DmId,
            AdvenId,
            adventure,
            encounter,
            monsters,
            title: 'Monsters'
        })
        
    })
    .catch((err)=>{
        console.log(err)
    })
    
})





module.exports = router