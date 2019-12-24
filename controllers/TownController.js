const _ = require('lodash');

const Town = require('../models/town');

module.exports = {
    index: function (req, res, next) {
        let query = _.get(req.query, 'q', '');

        Town.aggregate([
            {
                $match: {'townName': {$regex: `.*${query}.*`}}
            },
            {
                $lookup: {
                    "localField": "districtId",
                    "from": "districts",
                    "foreignField": "_id",
                    "as": "district",
                },
            },
            {
                $unwind: {
                    path: '$district',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "states",
                    localField: 'district.stateId',
                    foreignField: "_id",
                    as: "state",
                },
            },
            {
                $unwind: {
                    path: '$state',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,
                    town: '$townName',
                    state: '$state.stateName',
                    district: '$district.districtName',
                }
            }

        ]).exec(function (error, states) {
            return res.send(states);
        });
    }
};