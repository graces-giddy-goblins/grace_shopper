const router = require('express').Router()
const {Items} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const items = await Items.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

module.exports = router
