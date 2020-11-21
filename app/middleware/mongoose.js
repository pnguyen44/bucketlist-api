'use strict'

const database = require('config/database')
const mongoose = require('mongoose')
const uri = process.env.MONGOLAB_URI || database.mongoose.uri
mongoose.Promise = global.Promise
mongoose.connect(uri, {
  useMongoClient: true
})

module.exports = mongoose
