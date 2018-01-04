const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise


const DungeonMasterSchema = new Schema (
    {
        firstName:{
            type: String,
            required: true,
            unique: false
        },
        lastName: {
            type: String,
            required: true,
            unique: false
        },
        username:{
            type: String,
            required: true,
            unique: true
        },
        photoUrl:{
            type: String,
            default: 'http://pre06.deviantart.net/74dc/th/pre/i/2013/046/6/8/dungeon_master_by_axlsalles-d5v1nco.jpg',
            required: false,
            unique: false,

        },
        location:{
            type: String,
            default: 'Somewhere in the Forgotten Realms',
            required: false,
            unique: false,
        },
        dmStyle: {
            type: String,
            required: false
        },
        gamesRan: {
            type: Number,
            default: 0,
            required: false
        },
        adventures: []

    },
    {
        timestamps:{},
        usePushEach: true
    }
)


module.exports ={
    DungeonMasterSchema
}