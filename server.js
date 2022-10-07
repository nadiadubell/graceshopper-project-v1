const http = require("http");
const express = require('express');
const app = express();
const client = require('./db/client');

app.use(express.json());

client.connect();


const PORT = process.env["PORT"] ?? 3000
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
});