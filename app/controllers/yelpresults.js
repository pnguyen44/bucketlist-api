'use strict'
const request = require('request')
const apiKey = process.env.API_KEY

const controller = require('lib/wiring/controller')
// const models = require('app/models')
// const Yelpresult = models.yelpresult

// const authenticate = require('./concerns/authenticate')
// const setUser = require('./concerns/set-current-user')
// const setModel = require('./concerns/set-mongoose-model')

// const yelp = require('yelp-fusion')

const index = (req, res, next) => {
  const options = { method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: { term: req.query.term, location: req.query.location },
    headers: {
       // 'cache-control': 'no-cache',
      Authorization: 'Bearer ' + apiKey }
  }

  request(options, function (error, response, body) {
    if (error) {
      console.log('error on yelp search')
      response.sendStatus(400)
    }

    const obj = JSON.parse(body)
    const yelpresults = obj.businesses
    res.json({
      yelpresults: yelpresults
    })
  })
}

// const index = (req, res, next) => {
//   const clientId = process.env.CLIENT_ID
//   const clientSecret = process.env.CLIENT_SECRET
//   yelp.accessToken(clientId, clientSecret)
//     .then(result => {
//       const client = yelp.client(result.jsonBody.access_token)
//
//       client.search({
//         term: req.query.term,
//         location: req.query.location
//       })
//       .then(result => {
//         const yelpresults = result.jsonBody.businesses
//         res.json({
//           yelpresults: yelpresults
//         })
//       })
//       .catch(() => res.sendStatus(400))
//     })
//     .catch(() => res.sendStatus(400))
// }

const show = (req, res) => {
  res.json({
    yelpresult: req.yelpresult.toJSON({ virtuals: true, user: req.user })
  })
}

module.exports = controller({
  index,
  show
})
