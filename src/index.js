require('dotenv').config()
const process = require('node:process')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const winston = require('winston')
const loggerMiddleware = require('express-winston')

const db = require('./utils/db')
const rateLimiterMiddleware = require('./utils/rate-limiter')
const router = require('./routes')

db.authenticate()
  .then(() => console.log('Connection to database established successfully'))
  .catch((err) => console.error('Unable to connect to the database', err))

// Basic Configuration
const port = process.env.PORT || 3000

app.use(cors())
app.use(rateLimiterMiddleware)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  loggerMiddleware.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
)
app.use(router)

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})

process.on('SIGINT', async () => {
  try {
    if (db.isDefined) {
      console.log('Closing database')
      await db.close()
      console.log('Database closed')
      process.exit(0)
    }
  } catch {
    process.exit(1)
  }
})
