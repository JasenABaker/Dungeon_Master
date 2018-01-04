require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const DungeonMaster = require('./models/Dm')


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
    const JasenBaker = new DungeonMaster(
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
    return JasenBaker.save()
}).then(() => {
    const ChrisCrosby = new DungeonMaster(
        {
            firstName: 'Chris',
            lastName: 'Crosby',
            username: 'WorldsWorstWizard',
            location: 'Bethlahem, GA',
            dmStyle: 'Loves to make props and enhance the setting.',
            gamesRan: 20
        }
    )
    return ChrisCrosby.save()
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
