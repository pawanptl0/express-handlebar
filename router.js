const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => console.log(`get method called`))

module.exports = routes