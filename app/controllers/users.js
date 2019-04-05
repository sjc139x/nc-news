const fetchUserByID = require('../models/users');

function sendUserByID (req, res, next) {
    fetchUserByID(req.params)
    .then(([user]) => {
        res.status(200).send({ user });
    });
};

module.exports = sendUserByID;