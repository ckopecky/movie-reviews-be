import "dotenv/config";
import express from 'express';
import { middleware } from "./api/configureMiddleware";
import './services/passport';

import userRouter from './api/users/usersRouter';
import authRouter from './api/authentication/authRouter';
import authReviewRouter from './api/reviews/authReviewsRouter';
import reviewsRouter from './api/reviews/reviewsRouter';
import paymentRouter from './api/payments/paymentRouter';

const port = process.env.PORT || 5000;



