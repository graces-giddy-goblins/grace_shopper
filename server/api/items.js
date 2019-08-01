const router = require('express').Router()
const {Items, Cart, Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const items = await Items.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const foundItem = await Items.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(foundItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
