const express = require('express')
require('dotenv').config()

const app = express()

//lectura y parse del body
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
// TODO: CRUD: eventos

app.listen(process.env.PORT, () => console.log(`Ready on ${process.env.PORT}`))