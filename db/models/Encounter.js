const mongoose = require('mongoose')
const Schema = require('../schema')


const Encounter = mongoose.model('Encounter', Schema.EncounterSchema)

module.exports = Encounter