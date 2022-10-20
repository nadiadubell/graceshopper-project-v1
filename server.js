require('dotenv').config();
const express = require('express');
const server = express();
const client = require('./db/client');
const morgan = require('morgan');
const apiRouter = require('./api');
const CORS = require('cors');
const path = require('path');

const buildPath = path.join(__dirname, 'build');

server.use(express.static(buildPath));

server.use(express.json());

server.use(morgan('dev'));

server.use(CORS());

server.use((req, res, next) => {
  console.log('Starting body logger...');
  console.log(req.body);
  console.log('Body logger finished!');
  next();
});

server.use('/api', apiRouter);

server.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

server.get('/*', (req, res) => {
  res.status(404);
  res.send({
    name: 'PageNotFoundError',
    message: 'Page not found!',
  });
});

client.connect();

const PORT = process.env['PORT'] ?? 4000;

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
