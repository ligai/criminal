const express = require('express')
const app = express()
const http = require('http')
const querystring = require('querystring')
const url = require('url')
const bodyParser = require('body-parser')

app.use(express.static('public'))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const api = 'http://10.167.174.162:8080/wenshu'

app.get('/', (req, res) => {
  console.log('/')
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/search', (req, res) => {
  res.sendFile(__dirname + '/views/search.html')
})

app.get('/accusal/:id', (req, res) => {
  res.sendFile(__dirname + '/views/detail.html')
})

app.post('/search', (req, res) => {
  let u = querystring.stringify(req.body)
  console.log(req.body)
  var req = api+'/search?' + u
  httpGet(req,res)
})

function httpGet(req,res){
  console.log(1)
  console.log(api + req.originalUrl)
  http.get(req, (oRes) => {
    oRes.setEncoding('utf-8')
    console.log(req)
    let rawData = '';
    oRes.on('data', (chunk) => {
      rawData += chunk
    })
    oRes.on('end', () => {
      try {
        //let parsedData = JSON.parse(rawData)
         //console.log(rawData)
        res.send(rawData)
      } catch (e) {
        console.log(e)
      }
    }) 
  })
  
}


app.listen(3000, () => {
  console.log('OK')
})


