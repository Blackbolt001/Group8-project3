const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    let token = req.body.token || req.query.token || req.headers.authorization;
   // ["Bearer", ,tokenvalue>]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.owner = data;
    } catch {
      console.log('Invalid token');
      return req.status(400).json({ message: 'invalid token!' });
    }
    return req;

   },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    const token = jwt.sign({data:payload}, secret);
    return token;
  },
};
  