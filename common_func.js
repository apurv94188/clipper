
function get_time_stamp_now() {
    var curr_time_stamp = Date.now();
    var date_obj = new Date(curr_time_stamp);
    var date = date_obj.getDate();
    var month = date_obj.getMonth() + 1;
    var year = date_obj.getFullYear();
    var hours = date_obj.getHours();
    var minutes = date_obj.getMinutes();
    var seconds = date_obj.getSeconds();

    // prints date & time in YYYY-MM-DD format
    return hours+"::"+minutes+"::"+seconds+" " + date + "-" + month + "-" + year;
}

function log_msg(msg) {
    console.log(get_time_stamp_now() + ' || ' + msg);
}

module.exports.log_msg = log_msg;