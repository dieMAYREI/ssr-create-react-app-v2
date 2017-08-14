require('ignore-styles')
const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const favicon = require('serve-favicon')

require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app']
})

// routes
const index = require('./routes/index')
const universalLoader = require('./universal')

const app = express()

// Support Gzip
app.use(compression())

// Support post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Server favicon before to not show up in logs
app.use(favicon(path.join(__dirname, '../build', 'favicon.ico')))

// Setup logger
app.use(morgan('combined'))

app.use('/', index)

// Send a version of index.html that is stripped of placeholders. The service-worker requests this file directly.
app.use('/index.html', (req, res) => {
  fs.readFile(
    path.resolve(__dirname, '..', 'build', 'index.html'),
    'utf8',
    (err, htmlData) => {
      res.send(
        htmlData.replace(/DATA\s*=\s*{{.*?}}/g, '').replace(/{{.*?}}/g, '')
      )
    }
  )
})

// Server JS/CSS Bundle with Cache-Control
app.use(
  '/static',
  express.static(path.resolve(__dirname, '..', 'build/static'), {
    maxAge: '30d'
  })
)

// Server manifest with cache headers
app.use('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'manifest.json'), {
    maxAge: '1d'
  })
})

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

// Always return the main index.html, so react-router render the route in the client
app.use('/', universalLoader)

module.exports = app
