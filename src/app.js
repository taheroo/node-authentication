const express = require('express');
const http = require('http');
const helmet = require('helmet');
const bodyParser = require('body-parser');

require('./config/database');

const authApi = require('./api/auth');

const port = process.env.PORT || 4000;
const app = express();

app.use(helmet());
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// parse application/json
// Add headers
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://127.0.0.1:4000',
    'http://localhost:4000',
    'http://localhost:3000/',
    'http://localhost:3000',
  ];
  const { origin } = req.headers;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // Website you wish to allow to connect

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());

app.use(authApi);

app.all('*', (req, res) => {
  res.status(200).send({ message: 'Hello, world!' });
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is up on port : ${port}`);
});
