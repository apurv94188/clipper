const { copyFile } = require('fs');
const mongoose = require('mongoose');
const cf = require('../../common_func.js')

function get_db_connection (db_name) {

    const db_url = "mongodb://127.0.0.1/" + db_name;
    mongoose.connect(
        db_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then( result => {
        cf.log_msg("connected to mongodb database " + db_name + " successfully");
    })
    .catch( error => {
        cf.log_msg("Error: unable to connect to mongodb datsbase " + db_name);
        cf.log_msg(error);
        return "Bad Connection";
    })
    
    let db_conn = mongoose.connection   // get instance of the database connection

    // if connection unsuccessfull
    db_conn.on('error', console.error.bind(console, 'Unable to connect to mongodb'));

    return db_conn;
}

module.exports.fn_get_db_conn = get_db_connection;