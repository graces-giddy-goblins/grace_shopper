const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Items = db.model('items')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/items/', () => {
    const chest = {
      name: 'Sapient Pearwood Chest'
    }

    beforeEach(() => {
      return Items.create({
        name: 'Sapient Pearwood Chest',
        quantity: 0,
        imageUrl:
          'https://www.discworldemporium.com/829-thickbox_default/the-luggage.jpg',
        price: 1000.0,
        description:
          'A large chest made of sapient pearwood (a magical intelligent plant which is nearly extinct), impervious to magic and only grows in a few places outside the Agatean Empire, generally on sites of very old magic.  It can produce hundreds of little legs protruding from its underside and can move really fast if the need arises.  It has been described as half suitcase, half homicidal maniac.'
      })
    })

    it('GET /api/items', async () => {
      const res = await request(app)
        .get('/api/items')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(chest.name)
    })
  }) // end describe('/api/items')
}) // end describe('Items routes')
