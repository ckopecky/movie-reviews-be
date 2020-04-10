import 'dotenv/config';
import express from express;
import cookieSession from 'cookie-session';
import passport from 'passport';
import cors from 'cors';

const corsOptions = {
    credentials: true,
    origin: '*'
}

//list of middleware configured to our Express server

export const middleware = (server)  => {
    server.use(express.json());
    server.use(
        cookieSession({
            name: 'cineview',
            keys: [process.env.COOKIE_KEY],
            maxAge: 24 * 60 * 60 * 1000
        })
    );
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(cors(corsOptions));
}
