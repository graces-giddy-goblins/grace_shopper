const Sequelize = require('sequelize')
const db = require('../db')

const Items = db.define('items', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://vignette.wikia.nocookie.net/super-mario-kart-racing/images/5/5b/Item_Box_-_Mario_Kart_Wii.png/revision/latest?cb=20170331001434'
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Items
