require('dotenv').config()

const { Facebook, FacebookApiException } = require('fb')

const postIDs = [
  '431393286921843_1760033084057850',
  '431393286921843_1749692555091903',
  '431393286921843_1726247394103086',
]

const fb = new Facebook({
  appId: process.env.FB_APP_ID,
  appSecret: process.env.FB_APP_SECRET,
})
