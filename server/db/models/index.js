const User = require('./user')
const Items = require('./items')
const Order = require('./order')
const Cart = require('./cart')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Items, {through: Cart, unique: false})
Items.belongsToMany(Order, {through: Cart, unique: false})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Items,
  Order,
  Cart
}
