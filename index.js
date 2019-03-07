const express = require('express')
const app = express()
const morgan = require('morgan')
const wikiRoute = require('./routes/wiki')
const userRoute = require('./routes/user')

app.use('/wiki', wikiRoute);
app.use('/user', userRoute);
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
process.env.NODE_ENV === 'test' ? null : app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('HELLO')
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})
module.exports = app
