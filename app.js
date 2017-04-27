const express = require('express')
const indexRoute = require('./routes')
const apiRoute = require('./routes/api')
const app = express()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(express.static('public'))
app.use(express.static('node_modules'))

nunjucks.configure('views', {
    autoescape: true,
    express: app,
	tags: {
		variableStart: '<$',
		variableEnd: '$>'
	}
});

app.use('/', indexRoute)
app.use('/', apiRoute)

const server = app.listen(3000, function () {
    const host = server.address().address
    const port = server.address().port
    
    console.log('Listening at http://%s:%s', host, port)
})
