const express = require('express')
const routes = require('./routes')
const error = require('./middleware/errorHandler')
const app = express()
const port = process.env.PORT || 3001

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(routes)
app.use(error)

app.listen(port, () => {
    console.log('This app is listening to port: ', port)
})
module.exports = app