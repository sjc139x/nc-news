const fetchTopics = require('../models/topics');

//BELOW NEEDS ERROR HANDLING - BUT TEST FIRST
function sendTopics (req, res) {
    fetchTopics()
    .then(topics => {
        res.status(200).send({ topics });
    })
};

module.exports = sendTopics;
