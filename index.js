var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoutes');

// app.use(function (req, res, next) {
//     console.log('Time', Date.now())
// });

app.get('/', function (req, res, next) {
    console.log('Req method: ', req.method);
    next();
}, function (req, res, next) {
    console.log('Request Original Url', req.originalUrl);
    next();
}, function (req, res, next) {
    res.send('Request was Successful');
});

app.listen(PORT, () => {
    console.log(`Your server is running on port: ${PORT}`);
});
