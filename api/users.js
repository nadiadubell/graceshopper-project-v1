const express = require('express');
const usersRouter = express.Router();

const { requireUser, requireAdmin } = require('./utils');

const jwt = require('jsonwebtoken');
const { getUser, getUserByUsername, createUser } = require('../db/users');
const { getOrderHistoryById } = require('../db');
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

usersRouter.post('/register', async(req, res, next) => {
  const { username, password, isAdmin, firstName, lastName, email } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if(_user) {
      next({
        name: 'UsernameTakenError',
        message: "The username you've chose already exists, please choose another"
      })
    } else {
      const user = await createUser({
        username,
        password,
        isAdmin,
        firstName,
        lastName,
        email
      });

      const token = jwt.sign({
        id: user.id,
        username
      }, JWT_SECRET, {
        expiresIn: '1w'
      });

      const data = await getUser({
        username,
        password
      });

      res.send({
        user: data,
        message: "Thanks for signing up!",
        token
      });
    }
  } catch({ name, message }) {
    next({ name, message })
  }
})

usersRouter.get('/me', requireUser, (req, res) => {
  const user = req.user

  res.send(user);
})

usersRouter.get('/:username/admin', requireAdmin, async(req, res, next) => {
  const { username } = req.params;
  
  try {
    
  } catch({ name, message }) {
    next({ name, message })
  }
})

usersRouter.get('/:userId/profile', requireUser, async(req, res, next) => {
  const { userId } = req.params;

  try {
    if(req.user) {
      const userOrderHistory = await getOrderHistoryById(userId);
      res.send(userOrderHistory)
    }
  } catch({ name, message }) {
    next({ name, message })
  }
})

module.exports = usersRouter;