const cors = require("cors");
const express = require("express");

const app = express();
const apiRouter = require("./routes/api");

const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.code === 404)
    res.status(404).send({ msg: err.msg || "Resource Not Found" });
  next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "42703")
    res
      .status(400)
      .send({
        msg: `Bad Request: "${
          req.query.sort_by
        }" is not a column in the table, so cannot be used to sort.`
      });
  else if (err.code === 400)
    res.status(400).send({ msg: err.msg || "Bad Request" });
  else if (err.code === "22P02") {
    if (req.body.inc_votes && typeof req.body.inc_votes !== "number")
      res
        .status(400)
        .send({
          msg: `Bad Request: "${
            req.body.inc_votes
          }" is not a valid value for inc_votes (must be an integer).`
        });
    else if (typeof req.originalUrl.split("/")[3] !== "number")
      res
        .status(400)
        .send({
          msg: `Bad Request: "${
            req.originalUrl.split("/")[3]
          }" is not a valid endpoint (must be an integer).`
        });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.code === 405)
    res.status(405).send({ msg: err.msg || "Method Not Allowed" });
  next(err);
});

app.use((err, req, res, next) => {
  if (err.code === 422)
    res.status(422).send({ msg: err.msg || "Unprocessable Entity" });
  else if (err.code === "23503" || err.code === "23505")
    res
      .status(422)
      .send({ msg: err.msg || `Unprocessable Entity: ${err.detail}` });
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: err.msg || "Internal Sevrer Error" });
});

module.exports = app;
