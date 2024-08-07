// auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = 'your-client-id';
const GOOGLE_CLIENT_SECRET = 'your-client-secret';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '${process.env.REACT_APP_API_URL}/auth/google/callback',
  passReqToCallback: true,
},
function(profile, done) {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
