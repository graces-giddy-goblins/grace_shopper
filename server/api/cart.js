const router = require('express').Router()
const {Items, Cart, Order, User} = require('../db/models')

router.get('/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })
    res.json(order.getCarts())
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })
    if (!order) {
      order = await Order.create({
        userId: req.user.id
      })
    }
    const newCartItem = await Cart.create({
      orderId: order.id,
      itemId: req.body.id,
      quantity: req.body.quantity
    })
    res.json(newCartItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
