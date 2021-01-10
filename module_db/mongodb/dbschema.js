const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaClips = new Schema ({
    name: {type: String},
    data: {type: String, required: true}
});

module.exports.clips = SchemaClips;