// https://expressjs.com/en/4x/api.html#req.body
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// CORSを許可する
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.json())

// static
app.use('/static', express.static('static'))

// `GET` method sample.
app.get('/users', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  console.log('req.query:', req.query)
  console.log('req.headers:', req.headers)
  res.json([{
    name: 'Yohei'
  }, {
    name: 'Sasuke'
  }])
})

// `POST` method sample.
app.post('/users', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  const firstName = req.body.firstName
  const lastName = req.body.lastName

  res.send(`${firstName} ${lastName}`)
})

// Send error.
app.get('/error', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  res.send('Bad Request', 400)
})

app.listen(3000, () => {
  console.log('Express server is listening to 3000.')
})
