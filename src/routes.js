const path = require('path')
const indexRoutes = require('./routes/index')
const apiRoutes = require('./routes/api')
const express = require('express')
const router = express.Router()

router.use('/', indexRoutes)
router.use('/api', apiRoutes)
router.use('/public', express.static(path.join(process.cwd(), 'public')))

module.exports = router
