const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let townSchema = new Schema({
    districtId: {
        type: Schema.Types.ObjectId,
        ref: 'District'
    },
    townName: String,
    urbanStatus: String,
});

module.exports = mongoose.model('Town', townSchema);

