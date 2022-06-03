const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'views', 'index.html'))
})

module.exports = router
