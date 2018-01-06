const mongoose = require('mongoose')
const Schema = require('../schema')

const Player = mongoose.model('Player', Schema.PlayerSchema)


module.exports = Player