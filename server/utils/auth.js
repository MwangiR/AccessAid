require('dotenv').config();
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');

//set token secret and expiration date
const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  //function to authenticate routes
  AuthenticationError: new GraphQLError('Could not autheticate user', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    //allows token to be sent via headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    //['Bearer', '<tokenvalue>']
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;

      // Convert the createdAt timestamp to a human-readable date
      if (data.createdAt) {
        const createdAtTimestamp = data.createdAt;
        const createdAtDate = DateTime.fromMillis(createdAtTimestamp).toLocaleString(
          DateTime.DATETIME_FULL,
        );
        data.createdAt = createdAtDate;
      }
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
