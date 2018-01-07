const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const MonsterSchema = new Schema (
    {
        name: {
            type: String,
            required: [true, 'All monsters need name'],
            unique: false,
        },
        xp :{
            type: Number,
            required: [true, "needs xp"],
            unique: false
        },
        armorClass: {
            type: Number,
            required: [true, 'Monster needs Ac'],
            unique: false,
        },
        hitPoints: {
            type: Number,
            required: [true, 'Needs health'],
            unique: false
        },
        Speed: {
            type: Number,
            required: [true, 'I feel a need for speed'],
            unique: false
        },
        stats: {
            str: {
                type: Number,
                required: [true, 'Needs strength'],
                unique: false
            },
            dex: {
                type: Number,
                required: [true, 'Needs dexterity'],
                unique: false
            },
            con: {
                type: Number,
                required: [true, 'Needs strength'],
                unique: false
            },
            int:{
                type: Number,
                required: [true, 'Needs intelligence'],
                unique: false
            },
            wis:{
                type: Number,
                required: [true, 'Needs wisdom'],
                unique: false
            },
            cha:{type: Number,
                required: [true, 'Needs charisma'],
                unique: false
            }
        },
        skills: {
            type: String,
            required: false,
            unique: false
        },
        senses: {
            type: String,
            required: false,
            unique: false,
        },
        features: {
            type: String,
            required: false,
            unique: false,
        },
        actions: [String],
        description:{
            type: String,
            required: false,
            unique: false
        }
        },
        {
            timestamps: {},
            usePushEach: true
        }
    
    
)

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
        monsters: [MonsterSchema]
        
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
        encounters: [EncounterSchema],
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