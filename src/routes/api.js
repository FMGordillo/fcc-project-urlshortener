const express = require('express')
const dns = require('dns').promises
const URLModel = require('../models/URL')
const router = express.Router()

router.get('/shorturl/:id', async (req, res) => {
  try {
    const { id } = req.params

    const urlData = await URLModel.findOne({ where: { id } })

    if (urlData) {
      return res.redirect(urlData.url)
    } else {
      res.json({ error: 'No short URL found for the given input' })
    }
  } catch (error) {
    console.log('DB Error', { error })
    return res.json({ error: 'No short URL found for the given input' })
    // next(error)
  }
})

router.post('/shorturl', async (req, res) => {
  try {
    console.log({ req })
    const { url } = req.body

    // TODO: Improve this
    const parsedUrl = url.replace(/^https?:\/\/(www.)?/, '')
    const { address } = await dns.lookup(parsedUrl)

    if (address) {
      const urlData = await URLModel.create({ url })
      res.json({
        short_url: urlData.id,
        original_url: urlData.url,
      })
    } else {
      return res.json({ error: 'Invalid URL' })
    }
  } catch (error) {
    return res.json({ error: 'Invalid URL' })
    // next(error)
  }
})

module.exports = router
