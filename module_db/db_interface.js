// const express = require('express');
// const router = express.Router();

const db = require('./mongodb/dbfunction.js');
const cf = require('../common_func.js');

function add_clip_to_db (req, res, next) {
    // req.clip_obj = req.clip_obj
    db.add_clip(req, res, next);
    cf.log_msg('done with db_interface');
    next();
}

module.exports.add_clip_to_db = add_clip_to_db;