const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let stateSchema = new Schema({
    stateCode: String, // String is shorthand for {type: String}
    stateName: String,
});

module.exports = mongoose.model('State', stateSchema);

