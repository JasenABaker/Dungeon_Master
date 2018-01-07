const mongoose = require('mongoose')
const Schema = require('../schema')


const Monster = mongoose.model('Monster', Schema.MonsterSchema)

module.exports = Monster