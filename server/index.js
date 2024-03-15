const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// app.use() is a method used to mount middleware functions in the application's request handling pipeline. 

// Middleware
app.use(bodyParser.json())
app.use(cors())

const posts = require('./routes/api/posts')

// any route that goes th /api/posts is gonna be directed to posts
app.use('/api/posts', posts)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})