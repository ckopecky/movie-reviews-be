import 'dotenv/config';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findUserById, findUserByProfileId, createUser } from '../api/authentication/authHelper';
import regeneratorRuntime from "regenerator-runtime";


// serializeUser is used to stuff a piece of info into a cookie

passport.serializeUser((user, done) => done(null, user));

// deserializeUser is used to decode the received cookie and persist session

passport.deserializeUser((user, done) => done(null, user));

// passport Google Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    proxy: true,
    userProfileURL: process.env.USER_PROFILE_URL

},
  async (accessToken, refreshToken, profile, cb) => {
      console.log(profile)
    const found = await findUserByProfileId({ googleId: profile.id }, (err, user) => {
      return cb(err, user);
    });
    if(found) {
        return cb(null, found);
    } 
    else {
        createUser({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value
        });
        const found = await findUserByProfileId({googleId: profile.id})
        cb(null, found);
    }
  }
));

//TODO: Twitter and LocalStrategy
