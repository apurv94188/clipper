// const express = require('express');
// const router = express.Router();
const CC = require('../classes/clip-class.js')

const DATABASE = 'mongodb';

const DBSearch = require('./'+DATABASE+'/dbsearchfunction.js');
const cf = require('../common_func.js');

function searchClipByName (req,res,next) {
    cf.log_msg("db_Search_interface:: ");
    clipname = req.search_clip_obj.name;
    
    DBSearch.searchByName(req,res)
    .then( clipObj => {
        cf.log_msg("db_Search_interface (back):: db txn succsess");
        cf.log_msg(typeof(clipObj));
        res.db_status = 1;
        res.clipObj = clipObj;
        cf.log_msg(res.clipObj.m_sDescription)
        next();
    })
    .catch( error => {
        res.db_status = 0;
        next();
    })

    
}


module.exports.searchClipByName = searchClipByName;