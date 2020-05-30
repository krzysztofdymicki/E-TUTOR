require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let KEY_FOR_ADMIN_ACCOUNT = process.env.KEY_FOR_ADMIN_ACCOUNT

module.exports = {
  PORT,
  MONGODB_URI,
  KEY_FOR_ADMIN_ACCOUNT
}