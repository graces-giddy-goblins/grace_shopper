const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/', () => {
    const chest = {
      name: 'Sapient Pearwood Chest'
    }

    beforeEach(() => {
      return Cart.create({
        orderId: 1,
        itemId: 1,
        quantity: 3
      })
    })

    it('GET /api/cart', async () => {
      const res = await request(app)
        .get('/api/cart')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(chest.name)
    })
  }) // end describe('/api/items')
}) // end describe('Items routes')
