const { getUserById } = require('../db');

const requireAdmin = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    if (user.isAdmin) {
      next();
    } else {
      res.statusCode = 401;
      res.send({
        name: 'MissingAdminCredentialsError',
        message: 'You must be an administrator to perform this action',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
};

const requireUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.statusCode = 401;
    res.send({
      name: 'MissingUserCredentialsError',
      message: 'You must be a registered user to perform this action',
    });
  }
};

module.exports = {
  requireAdmin,
  requireUser,
};
