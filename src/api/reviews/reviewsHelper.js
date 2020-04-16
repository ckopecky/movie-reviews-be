import 'dotenv/config';
import db from "../../data/dbConfig";

/*
==============================================
this JS file includes helpers that access our
database accordingly (for example, getReviews
requests all the reviews in the reviews database)
============================================== */

const getReviews = id => {
    let query = db('moviereviews');
    if (id) query.where('id', Number(id)).first();
    return query;
}

const getReviewsByUserId = userId => {
    return db('moviereviews').where('userId', Number(userId));
}

const insert = review => {
    return db('moviereviews')
        .insert(review)
        .then(([id]) => module.exports.getReviews(id))
        .catch(err => {
            console.error(err);
        });
};

const update = (id, editedReview) => {
    return (
        db('moviereviews')
            .where('id', id)
            .update(editedReview)
            // get the id if there are more than 0 records otherwise get 0
            .then(count => (count > 0 ? module.exports.getReviews(id) : 0))
    );
}

const remove = (id) => {
    return db('moviereviews')
        .where('id', id)
        .del();
};

export { remove, update, insert, getReviews, getReviewsByUserId };