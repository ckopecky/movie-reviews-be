import 'dotenv/config';
import db from '../../data/dbConfig';

const getUsers = () => {
    return db('users');
};

const getUsersById = (id) => {
    return db('users')
        .where({id});
};

const insert = (user) => {
    return db('users')
        .insert(user);
}

const update = (id, user) => {
    return db('users')
        .where({id})
        .update(user);
};

const remove = (id) => {
    return db('users')
        .where({id})
        .del();
}

export { getUsers, getUsersById, update, insert, remove };