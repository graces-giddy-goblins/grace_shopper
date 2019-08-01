const router = require('express').Router()
const {Items, Cart, Order, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    console.log('USER ', req.user)
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
    const foundOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })

    const foundCart = await Cart.findOne({
      where: {
        orderId: foundOrder.id
      }
    })

    const updatedCart = await foundCart.update({
      quantity: req.body.quantity
    })
    res.send(updatedCart)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const foundOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })

    const foundCart = await Cart.findOne({
      where: {
        orderId: foundOrder.id
      }
    })

    const deletedItem = await foundCart.destroy({
      where: {
        itemId: req.body
      }
    })
    res.send(deletedItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
