require('dotenv').config();
const express = require('express');
const server = express();
const client = require('./db/client');
const morgan = require('morgan');
const apiRouter = require('./api');
const CORS = require('cors');
const path = require('path');
const { rebuildDB } = require('./db/seedData');

const buildPath = path.join(__dirname, 'dist');

server.use('/dist', express.static(buildPath));

server.use(express.json());

server.use(morgan('dev'));

// server.use(CORS());

//   // Express serve up index.html file if it doesn't recognize route
//   const path = require('path');
//   server.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//   });
// }

server.use((req, res, next) => {
  console.log('Starting body logger...');
  console.log(req.body);
  console.log('Body logger finished!');
  next();
});

server.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// server.get('/*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'dist', 'main.js'))
// );

server.use('/api', apiRouter);

server.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

// server.get('/*', (req, res) => {
//   res.status(404);
//   res.send({
//     name: 'PageNotFoundError',
//     message: 'Page not found!',
//   });
// });

const init = async () => {
  await client.connect();

  await rebuildDB();

  const PORT = process.env['PORT'] ?? 4000;

  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

init();
