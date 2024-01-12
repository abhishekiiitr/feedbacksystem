require("dotenv").config();
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");

const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;
const cors = require("cors");


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);




app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);




app.use(cors());

app.use(express.json());

const apiKey = '923c67d3-2d75-48d2-94e8-5b92332bcb6d';
const apiUrl = 'https://api.frill.co/v1';

app.post('/create-idea', async (req, res) => {
    try {
      const { name, description, approval_status, author_idx } = req.body;
  
      const payload = {
        name,
        description,
        approval_status,
        author_idx: author_idx,
      };
  
      console.log('Request Payload:', payload);

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
    const { name, description, approval_status } = idea;
    output.push({ name, description, approval_status });
    });

    console.log('Extracted Data:', output);
    res.json(output);
  } catch (error) {
    console.error('Error fetching ideas:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});