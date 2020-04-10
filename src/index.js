import "dotenv/config";
import express from 'express';
const server = express();
import { middleware } from "./api/configureMiddleware";
import './services/passport';

import userRouter from './api/users/usersRouter';
import authRouter from './api/authentication/authRouter';
import authReviewsRouter from './api/reviews/authReviewsRouter';
import reviewsRouter from './api/reviews/reviewsRouter';
import paymentRouter from './api/payments/paymentRouter';

const port = process.env.PORT || 5000;

middleware(server);

const isUserAuthenticated = (req, res, next) => {
    if((req.isAuthenticated(), { withCredentials: true})) {
        return next();
    } else {
        res.redirect('/');
    }
}

server.get('/', (req, res) =>
  res.status(200).send({ Success: 'Sanity check is working...' })
);

server.get('/sanityauth', isUserAuthenticated, (req, res) => {
  res.status(200).send({ Success: 'You have the secret!' });
});

server.use('/auth', authRouter);
server.use('/api', userRouter);
server.use('/api', reviewsRouter);
server.use('/api', isUserAuthenticated, authReviewsRouter);
server.use('/api', paymentRouter);

// start the server
server.listen(port, () => {
    console.log(`\n=== Server listening on port ${port} ===\n`);
});