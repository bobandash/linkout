const path = require('path');
require('dotenv').config({ path: __dirname + '../../.env' });
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = new JwtStrategy(
  {
    secretOrKey: process.env.SECRET_TOKEN,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (jwt_payload, done) => {
    User.findOne({ email: jwt_payload.email }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  },
);
