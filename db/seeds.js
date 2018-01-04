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
            photoUrl: 'https://imgur.com/6pTp9Tz'
        }
    )
    return JasenBaker.save()
}).then(() => {
    const ChrisCrosby = new DungeonMaster(
        {
            firstName: 'Chris',
            lastName: 'Crosby',
            username: 'WorldsWorstWizard',
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
