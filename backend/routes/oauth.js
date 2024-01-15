var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const {OAuth2Client} = require('google-auth-library');

async function getUserData(access_token) {
 console.log("access token : ",access_token);
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  
  //console.log('response',response);
  const data = await response.json();
  console.log('data',data);
  return data;
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("oauth") 
    const code = req.query.code;
    let payload = {};
    console.log(code);
    try {
        const redirectURL = "http://127.0.0.1:3001/oauth"
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
          );
        const r =  await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        const user = oAuth2Client.credentials;
        console.log('credentials',user);
        payload = await getUserData(oAuth2Client.credentials.access_token);
      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }
    console.log("This is payload data : ",payload,"  payload data")
    const queryString = new URLSearchParams(payload).toString();  
    //convert.key-value pairs in the payload object into a URL-encoded query string
    //console.log(queryString)
    res.redirect(303, `http://localhost:3000/?${queryString}`);
    //res.redirect(303, 'http://localhost:3000/');
});

module.exports = router;