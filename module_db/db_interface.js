// const express = require('express');
// const router = express.Router();

const db = require('./mongodb/dbfunction.js');
const cf = require('../common_func.js');

function add_clip_to_db (req, res, next) {
    cf.log_msg('db:: add_clip_to_db');
    cf.log_msg(req.clip_obj.name)

    db.add_clip(req, res)
    .then( result => {
        req.db_status = 1;
        cf.log_msg('db:: Clip saved successfully');
        next();
    })
    .catch( error => {
        req.db_status = 0;
        cf.log_msg('db:: Clip could not be saved');
        next();
    });

    cf.log_msg('done with db_interface');
    
}

module.exports.add_clip_to_db = add_clip_to_db;