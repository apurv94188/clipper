const express = require('express');
const { copyFile } = require('fs');
const router = express.Router();
const cf = require('../common_func.js');
const db = require('../module_db/db_interface.js');

// expected json obj:
// clip_name, clip_data
function addreq_to_json_obj (req, res, next) {
    cf.log_msg('addClip - midlayer - addreq_to_json_obj');
    
    cf.log_msg(req.body.clip_name);
    clip_obj = {
        name: req.body.clip_name,
        data: req.body.clip_data
    };

    req.clip_obj = clip_obj;
    next();
}

// add clip
router.post('/addClip', addreq_to_json_obj, db.add_clip_to_db, (req, res, next) => {
    cf.log_msg('addClip router from modify_clip');
    if (req.status == 1) {
        res.status(200).json({
            msg: 'Clip Saved Successfully',
            saved_clip_name: req.saved_clip.name
        });
    }
});


module.exports = router;


// modify clip

// delete clip
