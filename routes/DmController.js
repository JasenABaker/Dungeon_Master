const express = require('express');
const router = express.Router();

const DungeonMaster = require('../db/models/Dm')


router.get('/', (req,res) =>{
    DungeonMaster.find()
    .then((DMs)=>{
        res.json(DMs)
    })
    .catch((err)=>{
        console.log(err)
    })
})











module.exports = router