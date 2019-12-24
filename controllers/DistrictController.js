const _ = require('lodash');

const Town = require('../models/town');

module.exports = {
    index: function (req, res, next) {
        let query = _.get(req.query, 'q', '');
        Town.aggregate([
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
                $match: {'district.districtName': {$regex: `.*${query}.*`}}
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
                    Urban_status: '$urbanStatus',
                    State_code: '$state.stateCode',
                    State: '$state.stateName',
                    District: '$district.districtName',
                    District_code: '$district.districtCode'
                }
            }

        ]).exec(function (error, states) {
            return res.send(states);
        });
    }
};