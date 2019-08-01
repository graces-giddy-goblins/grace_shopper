const router = require('express').Router()
const {Items, Cart, Order, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        //when we logged-in, it created a req.user which has an id
        userId: req.user.id,
        complete: false
      }
    })

    //when we created a thru table, we also created these magic methods like get, add, set, remove.  It allows us to
    const cart = await order.getItems()

    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const foundCart = await Order.findOne({
      where: {
        userId: req.user.id
      }
    })

    // const updatedCart = await foundCart.update(req.body);
    res.send(foundCart)
    // res.send(updatedCart);
  } catch (err) {
    next(err)
  }
})

module.exports = router
