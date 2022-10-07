const express = require('express');
const app = express();
const client = require('./db/client');

app.use(express.json());

client.connect();
