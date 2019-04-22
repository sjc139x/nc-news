const { fetchUserByID, checkUser } = require('../models/users');

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

module.exports = sendUserByID;