const Model = require('./dbmodel.js');
const Connection = require('./dbconnect.js');
const db_name = "dbClipper";
const cf = require('../../common_func.js');

function add_clip(req, res, next) {
    let new_clip_data = req.clip_obj;

    const db_conn = Connection.fn_get_db_conn(db_name);
    let new_clip = new Model.Clips({
        name: new_clip_data.name,
        data: new_clip_data.data
    });

    new_clip.save()
    .then( result => {
        cf.log_msg('New Clip ' + new_clip.name + ' saved successfully');
        req.status = 1;
        req.saved_clip = {
            name: new_clip.name,
            data: new_clip.data
        };
        next();
    })
    .catch( error => {
        cf.log_msg('Failed to add new clip ' + new_clip.name + ' to the db');
        req.status = 0;
        req.error = {
            status: 500,
            msg: error
        };
        next();
    });
    next();
}


module.exports.add_clip = add_clip;