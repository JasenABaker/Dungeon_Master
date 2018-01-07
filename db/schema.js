const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const EncounterSchema = new Schema(
    {
        location:{
            type: String,
            required: [true, 'needs a location'],
            unique:false,
        },
        description: {
            type: String,
            required: [true, 'Describe the surrondings, please'],
            unique: false,
        },
        monsters: []
        
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

const PlayerSchema = new Schema (
    {
        characterName: {
            type: String,
            required: [true, 'Every adventurer needs a name'],
            unique: true,
            sparse: true
        },
        name: {
            type: String,
        },
        class: {
            type: String,
            required: [true, 'Needs a class']
        },
        level: {
            type: Number,
            required: [true, 'Need a level']
        },
        race: {
            type: String,
            required: [true, "Don't be racist, pick a race"]
        },
        armorClass: {
            type: Number,
            required: [true, 'Need and armor class']
        },
        hitPoints: {
            type: Number,
            required: [true, 'Needs hit points']
        },
        photoUrl: {
            type: String,
            default: 'http://www.tribality.com/wp-content/uploads/2015/02/halfling_bard-214x300.jpg'
        }
    },
    {
        timestamps:{}
    }
)


const AdventureSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'must put a name'],
        
        },
        description: {
            type: String,
            required: false,
            default: 'Dungeons and Dragons Adventure'
        },
        players: [PlayerSchema],
        encounters: [],
    },
    {
        timestamps: {},
        usePushEach: true
    }

)


const DungeonMasterSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            unique: false
        },
        lastName: {
            type: String,
            required: true,
            unique: false
        },
        username: {
            type: String,
            required: true,
            unique: true,
            sparse: true
        },
        photoUrl: {
            type: String,
            default: 'http://pre06.deviantart.net/74dc/th/pre/i/2013/046/6/8/dungeon_master_by_axlsalles-d5v1nco.jpg',
            required: false,
            unique: false,

        },
        location: {
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
        adventures: [AdventureSchema]

    },
    {
        timestamps: {},
        usePushEach: true
    }
)


module.exports = {
    DungeonMasterSchema,
    AdventureSchema,
    PlayerSchema,
    EncounterSchema
}