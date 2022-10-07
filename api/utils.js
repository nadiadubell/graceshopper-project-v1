export const requireAdmin = (req, res, next) => {

  if(!req.isAdmin) {
    res.statusCode = 401;
    next({
      name: 'MissingAdminCredentialsError',
      message: 'You must be an administrator to perform this action'
    })
  }

  next();
}

export const requireUser = (req, res, next) => {
  if (!req.user) {
    res.statusCode = 401;
    next({
      name: 'MissingUserCredentialsError',
      message: 'You must be a registered user to perform this action'
    })
  }
  next();
}