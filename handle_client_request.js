const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cf = require('./common_func.js');

// ***** get all the routes *****
const route_search = require('./module_search/search_clip.js');
const route_modify = require('./module_modify/modify_clip.js')

// ************************************************************************************
// ***** start handeling the incoming request

// ++ handling CORSE errors
// Cross-Origin-Resource-Sharing
app.use((req, res, next) => {
    cf.log_msg('CORS');
    //cf.log_msg('handelling CORSE errors');
    res.header("Access-Control-Allow-Origin", "*");
    // this will make the server handle the request originated from your websites
    //res.header("Access-Control-Allow-Origin", "https://friendsReview.com")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// -- end of CORSE error

// ++ route incoming request

// parse incoming request
app.use(bodyParser.json());
cf.log_msg('client request parsed');

//app.use('/searchclip', route_search);
app.use('/modifyClip', route_modify);

app.use((req, res, next) => {
    cf.log_msg('Error Couldnt handle request');
    var error = new Error('This request can\'t be haandled');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    cf.log_msg('failed......')
    res.status(error.status || 500);
    res.json({
        error: {
            error_msg: error.message
        }
    });
});

// -- end of route incoming request

module.exports = app;