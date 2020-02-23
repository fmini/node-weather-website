const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 8080

//Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //sets the path to the handlebars directory
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //changes the name of the handlebars directory from views to templates (viewsPath variable)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Frank Minichiello', //geocode: geocode
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Frank Minichiello'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Frank Minichiello'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  } 

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
          return res.send({ error })
      }

      res.send({
          forecast: forecastData,
          location,
          address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error:'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Frank Minichiello'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'OOPS',
    errorMessage: 'Page not found',
    name: 'Frank Minichiello'
  })
})

app.listen(port, () => {
  console.log('Server is up on port' + port)
})
