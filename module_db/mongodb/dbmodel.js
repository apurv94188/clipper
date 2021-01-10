const mongoose = require('mongoose');
const dbSchema = require('./dbschema.js');

const ModelClips = mongoose.model('clips', dbSchema.clips);

// first letter of model should always be Big-Caps
module.exports.Clips = ModelClips;