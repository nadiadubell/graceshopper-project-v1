const express = require('express');
const usersRouter = express.Router();

const { requireUser, requireAdmin } = require('./utils');

const jwt = require('jsonwebtoken');
const { getUser } = require('../db/users');
const { JWT_SECRET } = process.env;

usersRouter.post('/login', async(req, res, next) =>{
  const { username, password } = req.body;
  const user = await getUser({ username, password });

  if(!username || !password) {
    next({
      name: 'MissingCredentialError',
      message: 'Please supply both a username and a password'
    });
  }

  try {
    
    if(user) {
      const token = jwt.sign(user, JWT_SECRET, {expiresIn: '1w'});
      res.send({
        user,
        message: "you're logged in!",
        token
      })
    } else {
      next({
        name: 'InvalidCredentialsError',
        message: "Username or password is incorrect"
      })
    }
  } catch ({ name, message }) {
    next ({ name, message })
  }


})