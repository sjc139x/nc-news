const { fetchUsers, fetchUserByID, checkUser } = require('../models/users');

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

module.exports = { sendUsers, sendUserByID };