import 'dotenv/config';
import express from 'express';
const router = express.Router();
import passport from 'passport';
import usersDb from '../users/usersHelper';
import { redirect_server } from '../../services/helpers';

/*
==============================================
This route ('auth/logout'), which is on an <a>
tag (logout button) on the client-side, will log
the user out, remove the user session data on
the endpoint ('auth/current_user'), then redirect
the user back to the root client page.
==============================================
*/




const logout = (req, res) => {
    req.logout();
    redirect_server(res);
}

/*
==============================================
When the user logs in, the user session data,
which is the full user object, will exist at
this endpoint for the duration of the session.
This is the endpoint the client-side will be
checking in order to see if the user is
logged in.
==============================================
*/

const current_user = async (req, res) => {
    if(!req.user || req.user && !req.user.id) {
        res.status(400).send({ error: 'You are not logged in' });
    } else {
        const user = await usersDb.getUsersById(req.user.id);
        
        user ? res.status(200).send(req.user) : res.status(404).send({Error: "No user found"});
    }
}

/* 
=========================================================================
passport.authenticate middleware is used here to authenticate the request
Step #1 of login flow ➡️
this route ('/auth/google') initiates the
passport google oauth flow. On the client-
side, an <a> tag with an href that equals:
href={`${googleLogin}`}
(with our production origin as well) will
initiate the passport google OAuth flow.
=========================================================================
*/

const google = passport.authenticate('google', {
    scope: ['profile', 'email']
})

const googleCallback = passport.authenticate('google', (req, res) => {
    redirect_server(res);
} )

router.get('/logout', logout);
router.get('/current_user', current_user);
router.get('/google', google);
router.get('/google/callback', googleCallback);


//TODO: implement TWITTER and LOCAL STRATEGY
export default router;