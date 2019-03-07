const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('HELLO')
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})