import 'dotenv/config';
import express from 'express';
const router = express.Router();
import { getReviews, getReviewsByUserId, insert, update, remove } from './reviewsHelper.js';

// GET request that returns all reviews from the database
const getAllReviews = async (req, res) => {
    const allReviews = await getReviews();
    try {
        if(allReviews) {
            return res.status(200).json(allReviews);
        }
    } catch (error) {
        return res.status(500).json({
            message: 'the reviews could not be retrieved',
            error: error.message
        });
    }
};

// GET request that gets a review by id
const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await getReviews(id);
        if (!review) {
            return res
                .status(404)
                .json({ message: `the review does not exist at id of ${id}` });
        } else {
            return res.status(200).json(review);
        }
    } catch (error) {
        return res.status(500).json({
            message: 'the review could not be retrieved',
            error: error.message
        });
    }
};

router.route('/reviews')
    .get(getAllReviews)

router.route('/reviews/:id')
    .get(getReviewById);

export default router;
