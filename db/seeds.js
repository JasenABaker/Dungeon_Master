require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const DungeonMaster = require('./models/Dm')
const Adventure = require('./models/Adventure')


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
