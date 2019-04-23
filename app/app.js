const cors = require('cors');
const express = require('express')

const app = express();
const apiRouter = require('./routes/api');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
    if (err.code === 404) res.status(404).send({msg: err.msg || 'Resource Not Found'});
    next(err);
});

app.use((err, req, res, next) => {
    const codes = ['22P02', '42703', 400]
    if (codes.includes(err.code)) res.status(400).send({msg: err.msg || 'Bad Request'});
    next(err);
});

app.use((err, req, res, next) => {
    if (err.code === 405) res.status(405).send({msg: err.msg || 'Method Not Allowed'});
    next(err);
});

app.use((err, req, res, next) => {
    res.status(422).send({msg: 'Unprocessable Entity'});
});

app.use((err, req, res, next) => {
    res.status(500).send({msg: 'Internal Sevrer Error'});
});

module.exports = app;