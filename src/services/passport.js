import 'dotenv/config';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import usersDb from '../api/authentication/authHelper';

// serializeUser is used to stuff a piece of info into a cookie

passport.serializeUser((user, done) => done(null, user));

// deserializeUser is used to decode the received cookie and persist session

passport.deserializeUser((user, done) => done(null, user));

// passport Google Strategy

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    proxy: true,
    userProfileURL: process.env.USER_PROFILE_URL
}, () => createSlashRetrieveUser());


const createSlashRetrieveUser = async (token, tokenSecret, profile, done) => {
    const user = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
    }
    const existingUser = await usersDb.findUserByProfileId({...user});
    if(existingUser) {
        done(null, existingUser);
    } else {
        usersDb.createUser({...user});
        const found = await usersDb.findUserByProfileId({...user})
        done(null, found);
    }
}

passport.use('google', googleStrategy);

//TODO: Twitter and LocalStrategy
