const express = require('express');

const app = express();
const apiRouter = require('./routes/api');

app.use('/api', apiRouter);

app.use((err, req, res, next)=>{
    console.log(err)
    if (err.code === 404) res.status(404).send({msg: err.msg})
    next(err)
});

app.use((err, req, res, next)=>{
    const codes = ['22P02', 400]
    if (codes.includes(err.code)) res.status(400).send({msg: err.msg || 'Bad request'})
    next(err)
});

app.use((err, req, res, next)=>{
    res.status(500).send({msg: 'Internal sevrer error'})
});

module.exports = app;