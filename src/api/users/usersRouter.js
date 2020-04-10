import express from 'express';
const router = express.Router();
import {getUsers, getUsersById, insert, update, remove } from './usersHelper';

/*
==============================================
this JS file includes helpers that access our
database accordingly (for example, getUsers
requests all the users in the users database)
==============================================
*/

const fetchUsers = async (req, res) => {
    try {
        const users = await getUsers();
        if(users && users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({Error: "users not found"});
        }
    } catch (error) {
        res.status(500).json({Err:  error.message});
    }
};

const getUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUsersById(id);
        if(user && user.length > 0) {
            res.status(200).json(user[0]);
        } else {
            res.status(404).json({Error: "No user data found"});
        }
    } catch (error) {
        res.status(500).json({Error: error.message});
    }
};

const postUser = async (req, res) => {
    const { name, username, email } = req.body;
    if(name && username && email) {
        try {
            const user = await insert(req.body);
            if(user) {
                res.status(201).json({message: 'User successfully added'});
            } else {
                res.status(500).json({Error: "server error"});
            }
        } catch (error) {
            res.status(400).json({Error: "Must provide name, email, and username"});
        }
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name, username } = req.body;

    try {
        const count = await update(id, { email, name, username});

        if(count) {
            const user = await usersDb.getUsersById(id);
            if(user) {
                res.status(201).json(user);
            } else {
                res.status(401).json({Error: "There is no user by that id"});
            }
        } else {
            res.status(400).json({Error: "Request body must include email, name and username"});
        }
    } catch (error) {
        res.status(500).json({Error: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const count = await remove(id);

        if(count) {
            res.status(200).json({ message: 'User was successfully deleted'})
        } else {
            res.status(404).json({ message: 'No records found to delete '});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}



router.route("/users")
    .get(fetchUsers)
    .post(postUser);


router.route("/users/:id")
    .get(getUserId)
    .put(updateUser)
    .delete(deleteUser);


export default router;