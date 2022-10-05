const express = require('express');
const app = express();
const { client } = require('./db/client.js');

app.use(express.json());

client.connect();
