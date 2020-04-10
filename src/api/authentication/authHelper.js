import db from '../../data/dbConfig';

const findUserById = (id) => {
    return db('users')
        ,where('id', Number(id))
        .first();
}

const findUserByProfileId = (user) => {
    return db('users')
        .where(user)
        .first();
}

const createUser = (user) => {
    return db('users')
        .insert(user)
        .then(ids => ({ id: ids[0]}));
}

export { findUserById, findUserByProfileId, createUser };