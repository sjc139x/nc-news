const fetchUserByID = require('../models/users');

function sendUserByID (req, res, next) {
    fetchUserByID(req.params)
    .then(user => {
        user = user[0];
        res.status(200).send(user);
    });
};

module.exports = sendUserByID;