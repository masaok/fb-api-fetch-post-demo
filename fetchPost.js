#!/usr/bin/env node

require('dotenv').config()

const { Facebook, FacebookApiException } = require('fb')

// Test Page
// https://www.facebook.com/FB-API-Test-Page-101564011794467
const testPageId = '101564011794467'

// Test Post
// https://www.facebook.com/permalink.php?story_fbid=101564578461077&id=101564011794467
// const testPostId = '101564011794467_101564011794467'
const testPostId = '101564011794467'
const testFullPostId = `${testPageId}_${testPostId}`

// https://www.facebook.com/cnn/posts/10161492888686509
const randomCNNpostID = '10161492888686509'

const postIDs = [
  testFullPostId,
  randomCNNpostID,
  // '431393286921843_1760033084057850',
  // '431393286921843_1749692555091903',
  // '431393286921843_1726247394103086',
]

console.log('POST IDS:')
console.log(postIDs)

const FB = new Facebook({
  appId: process.env.FB_APP_ID,
  appSecret: process.env.FB_APP_SECRET,
})

FB.api(
  'oauth/access_token',
  {
    client_id: process.env.FB_APP_ID,
    client_secret: process.env.FB_APP_SECRET,
    grant_type: 'client_credentials',
  },
  response => {
    if (!response || response.error) {
      console.log('[!] OAuth Error Occurred')
      console.log(!response ? `Response was ${response}` : response.error)
      return
    }
    const accessToken = response.access_token
    console.log('Setting access token: ' + accessToken)
    token = accessToken
    FB.setAccessToken(accessToken)

    postIDs.forEach(postID => {
      // for (let i = 0; i < postIDs.length; i++) {
      // const postID = postIDs[i]
      FB.api(postID, res => {
        console.log('POST ID: ' + postID)
        if (!res || res.error) {
          console.log('ERROR')
          console.log(!res ? 'error occurred' : res.error)
          return
        }
        console.log(res.id)
        console.log(res.name)
      })
    })
  }
)
