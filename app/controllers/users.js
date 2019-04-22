const { fetchUsers, fetchUserByID, checkUser, addUser } = require('../models/users');
const { checkUserBodyFormat } = require('../../utils/utilFuncs');

function sendUsers (req, res, next) {
    fetchUsers()
    .then(users => res.status(200).send({ users }))
    .catch(next);
};

function sendUserByID (req, res, next) {
    checkUser(req.params.username)
    .then((username) => {
        if (username) {
            fetchUserByID(req.params)
            .then(([user]) => {
                if (user) res.status(200).send({ user })
                else Promise.reject({code: 404}).catch(next);
            });
        };
    });
};

function sendAddedUser (req, res, next) {
    if (checkUserBodyFormat(req.body)) {
        checkUser(req.body.username)
        .then(([username]) => {
            if (!username) {
                addUser(req.body)
                .then(([user]) => res.status(201).send({ user })).catch(next);
            } else Promise.reject({code: 422}).catch(next);
        }).catch(next);
    } else Promise.reject({ code: 400 }).catch(next);
};

module.exports = { sendUsers, sendUserByID, sendAddedUser };