'use strict'

const db = require('../server/db')
const {User, Items, Cart, Order} = require('../server/db/models')

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
  },
  {
    name: 'Love Potion',
    quantity: 0,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71qwadFXbWL._SX355_.jpg',
    price: 499.99,
    description:
      "Having trouble keeping your significant other? Want that cutie that sits at the back of class? Now it's easier than ever to get their affection! Just slip some love potion into their drink and...viola! Enough potion in each vile for five days."
  },
  {
    name: 'Whacky Broomstick',
    quantity: 0,
    imageUrl:
      'https://5.imimg.com/data5/SF/YV/MY-33039804/plastic-broomstick-500x500.jpg',
    price: 10.99,
    description:
      'Being whacked has never been so easy! Buy one of these stylish broomsticks and whack whomever you want, whenever you want!'
  }
]

const codysOrders = [
  {
    complete: false,
    userId: 1
  }
]

// const codysCart = [
//   {
//     quantity: 1,
//     orderId: 1,
//     itemId: 4
//   }
// ]

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

  let all_Order = await Promise.all(
    codysOrders.map(function(order) {
      return Order.create(order)
    })
  )

  // let all_Carts = await Promise.all(
  //   codysCart.map(function(cart) {
  //     return Cart.create(cart)
  //   })
  // )

  // let all_Carts = await Promise.all(codysOrders[0].addItems(items[3]))

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
