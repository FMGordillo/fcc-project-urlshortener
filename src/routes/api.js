const express = require('express')
const dns = require('node:dns').promises
const URLModel = require('../models/URL')
const router = express.Router()

router.get('/shorturl/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const urlData = await URLModel.findOne({ where: { id } })

    if (urlData) {
      return res.redirect(urlData.url)
    } else {
      res.send({ error: 'No short URL found for the given input' })
    }
  } catch (error) {
    console.log('DB Error', { error })
    next(error)
  }
})

router.post('/shorturl', async (req, res, next) => {
  try {
    const { url } = req.body

    // TODO: Improve this
    const parsedUrl = url.replace(/^https?:\/\/(www.)?/, '')
    const { address } = await dns.lookup(parsedUrl)

    if (address) {
      const urlData = await URLModel.create({ url })
      res.send({
        short_url: urlData.id,
        original_url: urlData.url,
      })
    } else {
      res.send({ error: 'Invalid URL' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
