const Express = require('express');
const router = Express.Router();
const cf = require('../common_func.js');

const db = require('../module_db/db_search_interface.js');

function bynameReqToJsonObj(req, res, next) {
    cf.log_msg('searchClip::bynameReqToJsonObj')
    
    let search_clip_obj = {
        name: req.body.search_detail.name
    }
    cf.log_msg('name=' + req.body.search_detail.name)
    req.search_clip_obj = search_clip_obj;
    next();
}

router.post('/byname', bynameReqToJsonObj, db.searchClipByName, (req,res,next) => {

    cf.log_msg("search_clip:: router.post byname");

    if (res.db_status == 1) {
        cf.log_msg("search_clip:: clip found " + res.clipObj);
        res.status(200).json({
            msg: 'Clip Found!!',
            clip: res.clipObj
        });
    } else {
        cf.log_msg("search_clip:: clip couldn't be found");
        res.status(500).json({
            msg: 'Clip could not be found',
            clipname: req.search_clip_obj.name
        });
    }

});

module.exports = router;