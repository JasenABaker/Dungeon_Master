const express = require('express');
const router = express.Router();

const DungeonMaster = require('../db/models/Dm')


router.get('/', (req, res) => {
    DungeonMaster.find()
        .then((DMs) => {
            res.render('dm/index', {
                DMs,
                title: 'Dungeon Masters'
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/new', (req, res) => {
    res.render('dm/new', { title: 'New Dungeon Master' })
})


router.post('/', (req, res) => {
    const newDm = req.body
    DungeonMaster.create(newDm)
        .then((Dm) => {
            res.redirect('/Dm')
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/:DmId', (req, res) => {
    const DmId = req.params.DmId

    DungeonMaster.findById(DmId)
        .then((Dm) => {
            res.render('dm/show', {
                DmId,
                Dm,
                title: `${Dm.username}`
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/:DmId/edit', (req, res) => {
    const DmId = req.params.DmId
    DungeonMaster.findById(DmId)
        .then((Dm) => {
            res.render('dm/edit', {
                Dm,
                DmId,
                title: `${Dm.username}`
            })
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.get('/:DmId/delete', (req, res) =>{
    const DmId = req.params.DmId

    DungeonMaster.findByIdAndRemove(DmId)
    .then(()=>{
        res.redirect("/Dm")
        return DungeonMaster.save()
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.put('/:DmId', (req, res)=>{
    const DmId = req.params.DmId
    const updatedDm = req.body
    DungeonMaster.findByIdAndUpdate(DmId, updatedDm, {new: true})
    .then(()=>{
        res.redirect(`/Dm/${DmId}`)
    })
    .catch((err) =>{
        console.log(err)
    })
})














module.exports = router