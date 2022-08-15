const moment = require('moment') // to get date and time

// create middleware
const logger = (req, res, next) => {
  console.log(`${ req.protocol }://${ req.get('host') }${ req.originalUrl }, Date: ${ moment().format() }`)
  next()
}

module.exports = logger