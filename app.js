const express = require('express')
const app = express()

// 允许跨域
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(8888, () => {
    console.log('server is running at http://localhost:8888')
})