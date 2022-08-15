const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
const exphbs = require('express-handlebars')
const members = require('./members')

//Init express
const app = express()
const port = 5000

//Init logger middleware
app.use(logger)

//set express-handlebars engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Body parser middle-ware
app.use(express.json())

//handle urlencoded data like form submission
app.use(express.urlencoded({ extended: false }))

app.use('/api/members', require('./routes/api/members'))

//HHome page which we created in view-layouts
app.get('/', (req, res) => res.render('index', { title: 'Members Page', members }))
//get request from client also post, put, delete, all
/*app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')) // send response to the client/Browser.
})*/

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

//binds and listens for connections 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${ port }`)
})

