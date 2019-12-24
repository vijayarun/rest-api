const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let districtSchema = new Schema({
    stateId: {
        type: Schema.Types.ObjectId,
        ref: 'State'
    },
    districtCode: String,
    districtName: String,
});

module.exports = mongoose.model('District', districtSchema);

