/* eslint-disable max-statements */
/* eslint-disable complexity */
const router = require('express').Router()
const {Items, Cart, Order, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.user == undefined) {
      console.log('cart', req.session.cart)
      res.send(req.session.cart)
      //let cart = await Object.values(Window.localStorage)
      //res.send(cart)
    } else {
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
    }
    // console.log('USER ', req.user)
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
        orderId: foundOrder.id,
        itemId: req.body.itemId
      }
    })

    const updatedCart = await foundCart.update({
      quantity: req.body.quantity
    })

    const fullUpdatedCart = await foundOrder.getItems()

    res.send(fullUpdatedCart)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    await order.update({
      complete: true
    })
    await Cart.destroy({
      where: {
        orderId: order.id
      }
    })
    res.sendStatus(204)
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
        itemId: req.body.itemId
      }
    })
    res.send(deletedItem)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  //req.session.cart = []
  try {
    if (req.user === undefined) {
      if (req.session.cart == null) {
        req.session.cart = []
      }
      let found = false
      let item = {}
      for (let i = 0; i < req.session.cart.length; i++) {
        let currentItem = req.session.cart[i]
        if (currentItem.id === Number(req.body.itemId)) {
          console.log('im here', currentItem.cart.quantity)
          currentItem.cart.quantity += Number(req.body.quantity)
          req.session.save()
          item = currentItem
          found = true
        }
      }
      if (!found) {
        let itemLikeObject = await Items.findByPk(req.body.itemId)
        item.id = itemLikeObject.id
        item.name = itemLikeObject.name
        item.imageUrl = itemLikeObject.imageUrl
        item.price = itemLikeObject.price
        item.description = itemLikeObject.description
        console.log('item', item)
        item.cart = {
          quantity: req.body.quantity,
          itemId: Number(req.body.itemId),
          orderId: 1
        }
        req.session.cart.push(item)
        req.session.save()
      }
      console.log('item', item)
      res.json(item)
    } else {
      let order = await Order.findOne({
        where: {
          userId: req.user.id,
          complete: false
        }
      })

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
      //want to send back what your redux store will actually be putting into our cart array
      res.json(lastItem)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
