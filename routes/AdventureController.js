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









module.exports = router