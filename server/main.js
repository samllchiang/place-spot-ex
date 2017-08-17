const path = require('path');
const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')

const app = express()
const { getAddressAndLocation } = require('./helper')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Serve static assets
// http://expressjs.com/en/starter/static-files.html
app.use('/static', express.static(path.resolve(__dirname, '../static')))

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../views', 'search.html'))
})

app.get('/template', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../views', 'search-without-react.html'))
})

app.post('/query-exp', function (req, res) {
  let query = req.query
  let body = req.body
  res.send('[routing from query-exp]' +
    `query = ${JSON.stringify(query)}` +
    `body = ${JSON.stringify(body)}`)
})

app.get('/api/history/:id', function (req, res) {
  let query = req.query
  let id = req.params.id;
  res.send('[/api/history/:id]' +
    `query = ${JSON.stringify(query)}` +
    `id = ${id}`)
})

app.get('/api/search-place', function (req, res) {
  let place = req.query.place;

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&language=zh-TW`
  request(url,
    function (error, response, body) {
      let result = getAddressAndLocation(JSON.parse(body))
      res.json(result);
    });
});
// http://localhost:3000/search-place?place=ntu

app.get('/api/search-nearby', function (req, res) {
  let lat = req.query.lat
  let lng = req.query.lng
  let placeAPI = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

  request({
    url: placeAPI,
    json: true,
    qs: {
      language: 'zh-TW',
      location: `${lat},${lng}`,
      radius: '500',
      type: 'restaurant',
      key: 'AIzaSyBImOy7k7q3nRG0YOcN2Z4GfQDu3q7WYNE'
    },
  },
    function (error, response, body) {
      res.json(body)
    })
})
// http://localhost:3000/search-nearby?lat=25.0339639&lng=121.5644722

app.get('/home', function (req, res) {
  let top = req.query.top;
  res.render('home', {
    top: top,
    title: 'Cover your page.',
    subTitle: 'Cover is a one-page template' +
    'for building simple and beautiful ' +
    'home pages.'
  })
})

// http://localhost:3000/home?top=newbrand
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
// http://localhost:3000/