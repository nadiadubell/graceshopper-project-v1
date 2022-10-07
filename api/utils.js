const requireAdmin = (req, res, next) => {

  if(!req.isAdmin) {
    res.statusCode = 401;
    next({
      name: 'MissingAdminCredentialsError',
      message: 'You must be an administrator to perform this action'
    })
  }

  next();
}

module.exports = requireAdmin();