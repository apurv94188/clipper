const Model = require('./dbmodel.js');
const Connection = require('./dbconnect.js');
const db_name = "dbClipper";
const cf = require('../../common_func.js');

function add_clip (req, res) {
    cf.log_msg('mongodb:: add_clip');
    return new Promise ((resolve, reject) => {
        let new_clip_data = req.clip_obj;
        cf.log_msg(req.clip_obj.name)
        const db_conn = Connection.fn_get_db_conn(db_name);
        let new_clip = new Model.Clips({
            name: new_clip_data.name,
            data: new_clip_data.data
        });
    
        new_clip.save()
        .then( result => {
            cf.log_msg('mongodb:: New Clip ' + new_clip.name + ' saved successfully');
            req.saved_clip = {
                name: new_clip.name,
                data: new_clip.data
            };
            //next();
            resolve(req.saved_clip)
            return
        })
        .catch( error => {
            cf.log_msg('mongodb:: Failed to add new clip ' + new_clip.name + ' to the db');
            req.error = {
                msg: error
            };
            //next();
            reject(req.error);
            return
        });
    })
}


module.exports.add_clip = add_clip;