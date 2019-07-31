const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  complete: {
    type: Sequelize.BOOLEAN,
    default: false
  }
})

module.exports = Order
