const mongoose = require('mongoose')
const Schema = require('../schema')


const Adventure = mongoose.model('Adventure', Schema.AdventureSchema)

module.exports = Adventure