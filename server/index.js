const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bodyParser = require('body-parser');
const requestIp = require('request-ip');

const { User } = require('./db');
const routes = require('./routers');

require('dotenv').config();

const DIST_PATH = path.resolve(__dirname, '..', 'client/dist');
const PORT = 8000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const authUser = (request, accessToken, refreshToken, profile, done) => {
  console.log(profile);
  User.findOrCreate({where: {googleId: profile.id}, defaults:{googleId: profile.id, username: profile.given_name, location: 'test'}})
    .then((user) => {done(null, user)})
}

const app = express();

console.log('ID', GOOGLE_CLIENT_ID, 'Secret', GOOGLE_CLIENT_SECRET)
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `/auth/google/callback`,
  passReqToCallback: true,
},
  authUser
))

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user)
})

passport.deserializeUser((user, done) => {
  console.log("\n--------- Deserialized User:")
  console.log(user)
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done (null, user)
})

app.use(express.static(DIST_PATH));
app.use(bodyParser.json())
app.use(requestIp.mw())

// routers
app.use('/api', routes);

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/home',
        failureRedirect: '/'
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(PORT, () => {console.info(`Server listening on http://127.0.0.1:${PORT}`)});
