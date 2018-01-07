require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const DungeonMaster = require('./models/Dm')
const Adventure = require('./models/Adventure')
const Player = require('./models/Player')
const Encounter = require('./models/Encounter')
const Monster = require('./models/Monster')


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

const goblin = new Monster ({
    name: 'Goblin',
    xp: 50,
    armorClass: 15,
    hitPoints: 7,
    speed: 30,
    stats: {
        str: 8,
        dex: 14,
        con: 10,
        int: 10,
        wis: 8,
        cha: 8,
    },
    skills:'Stealth +6',
    senses: 'Darkvision 60 ft., Passive Perception 9',
    features: [`Nimble Escape. The goblin can take the Disengage 
    or Hide action as a bonus action on each of its turns.`],
    actions:[`Scimitar. Melee Weapon Attack: +4 to hit, reach 5 ft., 
    one target. Hit: 5 (1d6 + 2) slashing damage.` , `Shortbow. Ranged 
    Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5
    (1d6 + 2) piercing damage.`],
    description:`Goblins are small, black-hearted humanoids that lair 
    in despoiled dungeons and other dismal settings. Individually 
    weak, they gather in large numbers to torment other creatures.`,
    photoUrl: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/351/1000/1000/636252777818652432.jpeg'
})

const bugBear = new Monster ({
    name: 'Bugbear',
    xp: 200,
    armorClass: 16,
    hitPoints: 27,
    speed: 30,
    stats: {
        str: 15,
        dex: 14,
        con: 13,
        int: 8,
        wis: 11,
        cha: 9,
    },
    skills:'Stealth +6, Survival +2',
    senses: 'Darkvision 60 ft., Passive Perception 10',
    features: [`Brute. A melee weapon deals one extra die of its damage 
    when the bugbear hits with it (included in the attack).`,`Surprise Attack. 
    If the bugbear surprises a creature and hits it with an attack during 
    the first round of combat, the target takes an extra 7 (2d6) 
    damage from the attack.`],
    actions:[`Morningstar. Melee Weapon Attack: +4 to hit, reach 5 ft., 
    one target. Hit: 11 (2d8 + 2) piercing damage.` , `Javelin. Melee or Ranged 
    Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 
    9 (2d6 + 2) piercing damage in melee or 5 (1d6 + 2) piercing damage at range.`],
    description:`Bugbears are hairy goblinoids born for battle and mayhem. They 
    survive by raiding and hunting, but are fond of setting ambushes and fleeing 
    when outmatched.`,
    photoUrl: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/221/1000/1000/636252765234633232.jpeg'
})

const wolf = new Monster ({
    name: 'Wolf',
    xp: 50,
    armorClass: 13,
    hitPoints: 11,
    speed: 40,
    stats: {
        str: 12,
        dex: 15,
        con: 12,
        int: 3,
        wis: 12,
        cha: 6,
    },
    skills:'Perception +3, Stealth +4',
    senses: 'Passive Perception 13',
    features: [`Keen Hearing and Smell. The wolf has advantage on Wisdom 
    (Perception) checks that rely on hearing or smell`,`Pack Tactics. The wolf 
    has advantage on attack rolls against a creature if at least one of the 
    wolf's allies is within 5 feet of the creature and the ally isn't 
    incapacitated.`],
    actions:[`Bite. Melee Weapon Attack: +4 to hit, reach 5 ft., one target. 
    Hit: 7 (2d4 + 2) piercing damage. If the target is a creature, 
    it must succeed on a DC 11 Strength saving throw or be knocked prone.`],
    description:`Its a wolf`,
    photoUrl: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/16/482/1000/1000/636376300223855327.jpeg'
})








const klargCave = new Encounter({
    location: "Klarg's Cave",
    description: `Sacks and crates of looted provisions are piled up in the
    south end of this large cave_ To the west, the floor slopes
    toward a narrow opening that descends into darkness. A
    larger opening leads north down a set of natural stone steps,
    the roar of falling water echoing from beyond. In the middle
    of the cavern, the coals ofa large fire smolder.`
})

const goblinAmbush = new Encounter({
    location: 'Goblin Ambush',
    description: `You've been on the Triboar Trail for about half a day. As you
    come around a bend, you spot two dead horses sprawled
    about fifty feet ahead of you, blocking the path. Each has
    several black-feathered arrows sticking out of it. The woods
    press close to the trail here, with a steep embankment and
    dense thickets on either side.`
})



const baraghVrinn = new Player({
    characterName: 'Baragh Vrinn',
    name: 'Jasen Baker',
    class: 'Bard',
    level: 4,
    race: 'Dark Elf',
    armorClass: 15,
    hitPoints: 29,
    photoUrl: 'https://i.pinimg.com/736x/d3/93/0f/d3930fab7c666b105c3456bce18827a2--drow-bard-character-concept.jpg'

})
const chernobob = new Player({
    characterName: 'Chernobob',
    name: 'Tim Turnquist',
    class: 'Ranger',
    level: 4,
    race: 'Dragonborn',
    armorClass: 16,
    hitPoints: 38,
    photoUrl: 'https://i.pinimg.com/736x/b1/fa/13/b1fa137c87f15c2ee4fa4e9b3449984e--sci-fi-fantasy-fantasy-images.jpg'

})
const sten = new Player({
    characterName: 'Sten the Giant',
    name: 'Bob Hoskins',
    class: 'Fighter',
    level: 1,
    race: 'Human',
    armorClass: 18,
    hitPoints: 30,
    photoUrl: 'https://i.pinimg.com/736x/81/a0/42/81a042f4a84125bc5aad1f8b3a4c5dde--dd-paladin-fantasy-paladin.jpg'
})

const lothoHarfoot = new Player({
    characterName: 'Lotho Harfoot',
    name: 'Ted Tuner',
    class: 'Rouge',
    level: 1,
    race: 'Halfling',
    armorClass: 14,
    hitPoints: 9,
    photoUrl: 'https://i.pinimg.com/736x/38/29/c2/3829c288642a8291a6008f7c2a088aa0--character-concept-character-art.jpg'
})

const therfalas = new Player({
    characterName: 'Therfalas',
    name: 'Chris Crosby',
    class: 'Wizard',
    level: 4,
    race: 'High Elf',
    armorClass: 12,
    hitPoints: 25,
    photoUrl: 'https://i.pinimg.com/736x/c3/2f/49/c32f49307bdebb2e9bb0e8de2635535f.jpg'

})

const malphas = new Player({
    characterName: 'Malphas Scarvenom',
    name: 'James Leigh',
    class: 'Paladin',
    level: 4,
    race: 'Tiefling',
    armorClass: 18,
    hitPoints: 39,
    photoUrl: 'https://i.pinimg.com/originals/b4/42/7a/b4427a40bb17a7d94493a3dec0f20615.jpg'
})


DungeonMaster.remove({}).then(() => {

    goblinAmbush.monsters.push(goblin, goblin)
    klargCave.monsters.push(bugBear, wolf, goblin, goblin)

    const jasenBaker = new DungeonMaster(
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
    minesPhandelver.encounters.push(goblinAmbush, klargCave)

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
    const forgeFury = new Adventure(
        {
            name: 'The Forge of Fury',
            description: `The characters come to the Stone Tooth in search of
            a reputed cache of Durgeddin's superior blades and find
            the stronghold inhabited by dangerous monsters.`

        }
    )
    forgeFury.players.push(baraghVrinn, lothoHarfoot, malphas)
    const fistTorm = new Adventure(
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
