const express = require('express');
const router = express.Router({mergeParams: true});

const DungeonMaster = require('../db/models/Dm')
const Adventure = require('../db/models/Adventure')

router.get('/', (req, res)=>{
    const DmId = req.params.DmId

    DungeonMaster.findById(DmId)
    .then((Dm)=>{
        res.render('Adventures/index', {
            adventures: Dm.adventures,
            DmId: Dm._id,
            title: `${Dm.username}'s Adventures`
        })
    }).catch((err)=>{
        console.log(err)
    })

})









module.exports = router