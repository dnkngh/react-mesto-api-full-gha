require('dotenv').config();
const jwt = require('jsonwebtoken');

const Unauthorized = require('./errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Пройдите авторизацию'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      // process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : '5sd0fhd5sqsa62ghs',
      '5sd0fhd5sqsa62ghs',
    );
  } catch (err) {
    return next(new Unauthorized('Пройдите авторизацию'));
  }

  req.user = payload;
  return next();
};
