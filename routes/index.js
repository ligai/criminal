const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => {
     res.render('index.html')
})

router.get('/list', (req, res) => {
    res.render(path.join(__dirname, '../views', 'search.html'))
})

router.get('/content/detail', (req, res) => {
    res.render(path.join(__dirname, '../views', 'detail.html'))
})

module.exports = router
