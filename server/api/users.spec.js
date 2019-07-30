/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')

  describe('GET /api/users/:userId/cart route', () => {
    it('gets all items associated with a user', async () => {
      const response = await agent.get('/api/users/1/cart').expect(200)
      expect(response.body).to.have.length(2)
      expect(response.body[0].userId).to.equal(1)
    })
  })
}) // end describe('User routes')
