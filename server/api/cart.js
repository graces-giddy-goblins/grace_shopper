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

module.exports = router
