const express = require('express')
const router = express.Router()
const genMainPage = require('../views/main')
const addPage = require ('../views/addPage')

router.get('/', (req, res)=>{
  res.send(genMainPage())
})

router.get('/add', (req, res)=>{
  res.send(addPage())
})
module.exports = router
