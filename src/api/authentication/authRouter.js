import 'dotenv/config';
import express from 'express';
const router = express.Router();
import passport from 'passport';
import { getUsers, getUsersById, update, remove, insert} from '../users/usersHelper';
import { serverURL } from '../../services/helpers';


const successfulRedirect = 
process.env.NODE_ENV === "production" ?
process.env.REDIRECT_URI_PROD : process.env.REDIRECT_URI_DEV;

const failureRedirect = 
process.env.NODE_ENV === 'production' ?
process.env.REDIRECT_URI_PROD : process.env.REDIRECT_URI_DEV;
//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(serverURL);
});

//current user
router.get('/current_user', async (req, res) => {
    if(!req.user || req.user && !req.user.id) {
        res.status(400).json({ error: 'You are not logged in' });
        res.redirect('/')
    } else {
        const user = await getUsersById(req.user.id);
        
        user ? res.status(200).json(req.user) : res.status(404).json({Error: "No user found"});
    }
});

//get scopes
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

//cb
router.get('/google/callback', passport.authenticate('google', 
    {successMessage: "Successfully logged in", successRedirect: successfulRedirect, failureRedirect, failureMessage: "Failed to log in"}
));

//TODO: implement TWITTER and LOCAL STRATEGY
export default router;