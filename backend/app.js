var createError = require('http-errors');
var path = require('path');
var authRouter = require('./routes/oauth');
var requestRouter = require('./routes/request');

require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const port = 3001;

const cors = require("cors");
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;

app.post('/create-idea', async (req, res) => {
    try {
      const { name, description,cover_image, approval_status, author_idx } = req.body;
  
      const payload = {
        name,
        description,
        cover_image,
        approval_status,
        author_idx: author_idx,
      };
  
      //console.log('Request Payload:', payload);

      const response = await axios.post(`${apiUrl}/ideas`, payload, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      res.json(response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/get-ideas', async (req, res) => {
  //console.log("aaya ")
  try {
    const response = await axios.get(`${apiUrl}/ideas`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    let output = [];

    response.data.data.forEach(idea => {
    const { name, description,cover_image, approval_status } = idea;
    output.push({ name, description,cover_image, approval_status });
    });

    console.log('Extracted Data:', output);
    res.json(output);
  } catch (error) {
    console.error('Error fetching ideas:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




//-----------------------------------------------//oauth function



app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/oauth', authRouter);
app.use('/request', requestRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//------------------------------------------------


app.listen(port, () => {
  console.log("Server is running on port", port);
});


module.exports = app; //leter delete