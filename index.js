const express = require('express');
const app = express();
const morgon = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const codeRoute = require('./api/routes/code');
const userRoute = require('./api/routes/user')

mongoose.connect('mongodb://jaggi:jaggi123@ds129821.mlab.com:29821/code-builder');

mongoose.Promise = global.Promise;

app.use(morgon('dev'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());      

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Origin-Headers', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');

    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }
    next();
});

app.use('/code', codeRoute);
app.use('/user', userRoute);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

});

module.exports = app;