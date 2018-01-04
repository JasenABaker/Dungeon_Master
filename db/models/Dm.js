const mongoose = require('mongoose')
const Schema = require('../schema')

const DungeonMaster = mongoose.model('DungeonMaster', Schema.DungeonMasterSchema)

module.exports = DungeonMaster