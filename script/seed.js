'use strict'

const db = require('../server/db')
const {User, Items} = require('../server/db/models')

const items = [
  {
    name: 'Sapient Pearwood Chest',
    quantity: 0,
    imageUrl:
      'https://www.discworldemporium.com/829-thickbox_default/the-luggage.jpg',
    price: 1000.0,
    description:
      'A large chest made of sapient pearwood (a magical intelligent plant which is nearly extinct), impervious to magic and only grows in a few places outside the Agatean Empire, generally on sites of very old magic.  It can produce hundreds of little legs protruding from its underside and can move really fast if the need arises.  It has been described as half suitcase, half homicidal maniac.'
  },
  {
    name: 'Invisible Hat',
    quantity: 0,
    price: 25.0,
    description: "Nobody will know you're even wearing a Hat!"
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  let all_Items = await Promise.all(
    items.map(function(item) {
      return Items.create(item)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
