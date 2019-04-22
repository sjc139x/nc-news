const app = require('./app');
const PORT = process.env.PORT || 3030;

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Listening on port ${PORT}...`);
});
