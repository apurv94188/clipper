const Mongoose = require('mongoose');
const DBModel = require('./dbmodel.js');
const CC = require('../../classes/clip-class.js')
const cf = require('../../common_func.js');
const CONNECTION = require('./dbconnect.js');

const db_name = "dbClipper";

function getClipClassObj(find_output) {
    cf.log_msg('reformatClipData::');
    let clipObj = new CC.CClip(find_output.name);
    clipObj.m_sDescription = find_output.data;
    return clipObj;
}

function searchByName(req, res) {
    cf.log_msg('searchByName');
    cf.log_msg(req.search_clip_obj.name);
    let search_clipname = req.search_clip_obj.name;
    const db_conn = CONNECTION.fn_get_db_conn(db_name);
    return new Promise ((resolve, reject) => {
        DBModel.Clips.find({name: new RegExp(search_clipname)})
        .then( result => {
            result = result[0]; // get the 1st record
            cf.log_msg('Clip fetched successfully');
            clipObj = getClipClassObj(result);
            resolve(clipObj);
            return
        })
        .catch( error => {
            cf.log_msg('Error: couldnot get clip');
            reject(error);
            return
        })
    });
}


function searchByKeywords(req, res) {
    cf.log_msg('searchByClipName');

    return new Promise ((resolve, rejet) => {

        var regex = "";
        var regex = [];

        for (key in req.search_clip_obj.key_words) {
            regex.push({name: {$regex: key}})
        }

        DBModel.Clips.find({
            $or: regex
        });
        


    });

}

module.exports.searchByName = searchByName