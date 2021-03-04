const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // GET TOKEN FROM THE HEADER
  const token = req.header('x-auth-token');

  // CHECK TOKEN DOES NOT EXIST
  if(!token) {
    return res.status(401).json({ msg: 'No token, access denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

    next();

  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};