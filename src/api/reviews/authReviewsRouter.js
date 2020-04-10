import 'dotenv/config';
import express from 'express';
const router = express.Router();
const reviewsDb = require('./reviewsHelper.js');

//GET review by user id
const getReviewsByUserId = async (req, res) => {
    const userId = req.body.userId;
    try {
        // get reviews of the current user
        const currentUserReviews = await reviewsDb.getReviewsByUserId(userId);
        res.status(201).json(currentUserReviews);
    } catch (error) {
        return res.status(500).json({
        message: 'the review could not be added',
        error: error.message
        });
    }
};

//POST review
const postReview = async (req, res) => {
    const userId = req.body.userId;
    if (req.body.textBody && req.body.rating && userId) {
        // create a new review based on the caller body
        const newReview = await reviewsDb.insert(req.body);
        try {
        // get reviews of the current user
        const currentUserReviews = await reviewsDb.getReviewsByUserId(userId);
        // console.log('currentUserReviews: ', currentUserReviews);

        // respond with a 201 on success
        res.status(201).json(currentUserReviews);
        } catch (error) {
        // catch any error and return a 500
        return res.status(500).json({
            message: 'the review could not be added',
            error: error.message
        });
        }
    }
};

//PUT review
const updateReview = async (req, res) => {
    const { id } = req.params;
    const editedReview = await reviewsDb.update(req.params.id, req.body);

    if (req.body.textBody && req.body.rating) {
        try {
        // make sure edited review is not null
        if (editedReview === 0) {
            // if it is then send 404
            return res
            .status(404)
            .json({ Error: `Review with ID ${id} does not exist.` });
        } else {
            // otherwise send a 200 on success
            return res.status(200).json(editedReview);
        }
        } catch (error) {
        // catch any other error and send a 500
        return res.status(500).json({
            message: 'the review could not be edited',
            error: error.message
        });
        }
    }
};

//DELETE request that deletes a review
const deleteReview = async (req, res) => {
    const { id } = req.params;
    // console.log('\n** DELETING ****', id);
    try {
        // this returns the count, not the review
        const count = await reviewsDb.remove(id);

        if (count === 0) {
        res
            .status(404)
            .json({ message: `the review with id ${id}  does not exist` });
        } else {
        // so this would be returning a number
        res.status(200).json(count);
        }
    } catch (error) {
        // catch any other error and return a 500 with the error message
        console.log('\n******* ERROR Deleting Review ********', error);
        res.status(500).json({
        message: 'the review could not be deleted',
        error: error.message
        });
    }
};

router.route('/currentuserreviews')
    .get(getReviewsByUserId)

router.route('/reviews')
    .post(postReview)

router.route('/reviews/:id')
    .put(updateReview)
    .delete(deleteReview)

export default router;
