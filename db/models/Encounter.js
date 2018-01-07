const mongoose = require('mongoose')
const Schema = require('../schema')


const Encounter = mongoose.model('Adventure', Schema.EncounterSchema)

module.exports = Encounter