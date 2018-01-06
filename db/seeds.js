require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const DungeonMaster = require('./models/Dm')
const Adventure = require('./models/Adventure')
const Player = require('./models/Player')


mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
})

mongoose.connection.once('open', () => {
    console.log(`Mongoose has connected to MongoDB`)
})

mongoose.connection.on('error', (error) => {
    console.error(`
    MongoDB connection error!!! 
    ${error}
    `)
    process.exit(-1)
})

const baraghVrinn = new Player ({
    characterName:'Baragh Vrinn',
    name: 'Jasen Baker',
    class:'Bard',
    level: 4,
    race: 'Dark Elf',
    armorClass: 15,
    hitPoints: 29,
    photoUrl: 'https://i.pinimg.com/736x/d3/93/0f/d3930fab7c666b105c3456bce18827a2--drow-bard-character-concept.jpg'

})
const chernobob = new Player ({
    characterName:'Chernobob',
    name: 'Tim Turnquist',
    class:'Ranger',
    level: 4,
    race: 'Dragonborn',
    armorClass: 16,
    hitPoints: 38,
    photoUrl:'https://i.pinimg.com/736x/b1/fa/13/b1fa137c87f15c2ee4fa4e9b3449984e--sci-fi-fantasy-fantasy-images.jpg'

})
const sten = new Player({
    characterName:'Sten the Giant',
    name: 'Bob Hoskins',
    class:'Fighter',
    level: 1,
    race: 'Human',
    armorClass: 18,
    hitPoints: 30,
    photoUrl:'https://i.pinimg.com/736x/81/a0/42/81a042f4a84125bc5aad1f8b3a4c5dde--dd-paladin-fantasy-paladin.jpg'
})

const lothoHarfoot = new Player ({
    characterName:'Lotho Harfoot',
    name: 'Ted Tuner',
    class:'Rouge',
    level: 1,
    race: 'Halfling',
    armorClass: 14,
    hitPoints: 9,
    photoUrl: 'https://i.pinimg.com/736x/38/29/c2/3829c288642a8291a6008f7c2a088aa0--character-concept-character-art.jpg'
})

const therfalas = new Player({
    characterName:'Therfalas',
    name: 'Chris Crosby',
    class:'Wizard',
    level: 4,
    race: 'High Elf',
    armorClass: 12,
    hitPoints: 25,
    photoUrl:'https://i.pinimg.com/736x/c3/2f/49/c32f49307bdebb2e9bb0e8de2635535f.jpg'

})

const malphas = new Player ({
    characterName:'Malphas Scarvenom',
    name: 'James Leigh',
    class:'Paladin',
    level: 4,
    race: 'Tiefling',
    armorClass: 18,
    hitPoints: 39,
    photoUrl: 'https://i.pinimg.com/originals/b4/42/7a/b4427a40bb17a7d94493a3dec0f20615.jpg'
})


DungeonMaster.remove({}).then(() => {
    const jasenBaker = new DungeonMaster (
        {
            firstName: 'Jasen',
            lastName: 'Baker',
            username: 'Atramentous',
            photoUrl: 'https://i.imgur.com/6pTp9Tz.jpg',
            location: 'Sugar Hill, GA',
            dmStyle: 'A strong emphasis on Role Playing.',
            gamesRan: 13
        }
    )

    const minesPhandelver = new Adventure({
            name: 'Lost Mines of Phandelver',
            description: `Lost Mine of Phandelver is an adventure for four to five
            characters of 1st level. During the course of the adventure,
            the characters will advance to 5th level. The adventure
            is set a short distance from the city of Neverwinter in the
            Sword Coast region of the Forgotten Realms setting. The
            Sword Coast is part of the North-a vast realm of free
            settlements surrounded by wilderness and adventure.`
        })

        minesPhandelver.players.push(therfalas, chernobob, sten)

    const askDirections = new Adventure({
            name: 'Never Ask Directions',
            description: `When the party stops to ask directions of a reclusive halfling, 
            they find him eagar to point out the way. Unfortunately, 
            the path he directs them on is straigt towars a troop of 
            bandits with who the halfling intends to settle an old score.`
        })


    jasenBaker.adventures.push(minesPhandelver, askDirections)    
    
    return jasenBaker.save()
}).then(() => {
    const chrisCrosby = new DungeonMaster(
        {
            firstName: 'Chris',
            lastName: 'Crosby',
            username: 'WorldsWorstWizard',
            location: 'Bethlahem, GA',
            dmStyle: 'Loves to make props and enhance the setting.',
            gamesRan: 20
        }
    )
    const forgeFury = new Adventure (
        {
            name: 'The Forge of Fury',
            description: `The characters come to the Stone Tooth in search of
            a reputed cache of Durgeddin's superior blades and find
            the stronghold inhabited by dangerous monsters.`

        }
    )
    forgeFury.players.push(baraghVrinn,lothoHarfoot, malphas)
    const fistTorm = new Adventure (
        {
            name: 'The Fist of Torm',
            description: `After a heavy storm at sea, the ship the PC’s are on 
            have to put into a safe harbor. Unfortunately that harbor was Daggerford, 
            a town under the control of the Brotherhood of Torm and locked down. 
            They run afoul of the sinister Zackam Laughingshadow, 
            but receive help from the unassuming halfling Arin Rumble. 
            She asks them for help in exchange for showing them the way out of town`
        }
    )
    chrisCrosby.adventures.push(forgeFury, fistTorm)
    return chrisCrosby.save()
}).catch((err) => {
    console.log('ERROR SAVING SEED DATA!!')
    console.log(err)
}).then(() => {
    mongoose.connection.close()
    console.log(`
    Finished seeding database...
    
    Disconnected from MongoDB
    `)
})
