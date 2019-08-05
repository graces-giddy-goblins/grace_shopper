const router = require('express').Router()
const {Items, Cart, Order, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    // console.log('USER ', req.user)
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

router.post('/', async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })

    // console.log("WHERE'S MY ORDER", order)

    if (!order) {
      order = await Order.create({
        userId: req.user.id,
        complete: false
      })
    }

    let itemUpdate = await Cart.findOne({
      where: {
        orderId: order.id,
        itemId: req.body.itemId
      }
    })
    console.log('IS THERE AN ORDER UPDATE', itemUpdate)
    //FIX ADDING DUPLICATES ROUTE

    //if item is not in cart, create a new item in cart
    if (!itemUpdate) {
      const newCartItem = await Cart.create({
        orderId: order.id,
        itemId: req.body.itemId,
        quantity: req.body.quantity
      })
    } else {
      await itemUpdate.update({
        quantity: Number(itemUpdate.quantity) + Number(req.body.quantity)
      })
    }
    const item = await order.getItems()
    const lastItem = item[item.length - 1]
    // console.log(lastItem)
    //want to send back what your redux store will actually be putting into our cart array
    res.json(lastItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
