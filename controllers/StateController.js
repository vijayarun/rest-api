const _ = require('lodash');

const District = require('../models/district');

module.exports = {
    index: function (req, res, next) {
        let query = _.get(req.query, 'q', '');

        District.aggregate([
            {
                $lookup: {
                    "localField": "stateId",
                    "from": "states",
                    "foreignField": "_id",
                    "as": "state",
                },
            },
            {
                $match: {'state.stateName': {$regex: `.*${query}.*`}}
            },
            {
                $project: {
                    _id: 0,
                    district_code: '$districtCode',
                    district: '$districtName',
                    state: { "$arrayElemAt": [ "$state.stateName", 0 ]}
                }
            }
        ]).exec(function (error, states) {
            return res.send(states);
        });
    }
};