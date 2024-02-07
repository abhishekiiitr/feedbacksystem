var express = require('express');
var router = express.Router();
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const {OAuth2Client} = require('google-auth-library');       // auth2 authorization with google services

/* GET users listing. */
router.post('/', async function(req, res, next) {  
  console.log("request aaya")           // defining a route handler for the post request to '/'
  const redirectURL = 'http://127.0.0.1:3001/oauth';
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
      redirectURL
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
      prompt: 'consent'
    });
    console.log(authorizeUrl);
    res.json({url:authorizeUrl})

});

module.exports = router;