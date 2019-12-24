const _ = require('lodash');
const csv = require('csvtojson');
const path = require('path');
const async = require('async');

const Constant = require('../util/Constants');
const Helper = require('../util/Helper');
const mongoDBHelper = require('../util/MongoDBHelper');

const State = require('../models/state');
const District = require('../models/district');
const Town = require('../models/town');

mongoDBHelper.connect().then(() => {
    csv({
        noheader: false,
        output: "csv"
    }).fromFile(path.resolve(Constant.PATH.DATA, 'City List.csv')).then(importData);

});
let importData = function (datum) {

    Helper.logTitle('Importing Data' + datum.length, true);
    let importData = {}, errorObj, row = 0;
    async.eachSeries(datum, (data, nextCallback) => {
        importData = {
            stateCode: _.get(data, 3),
            stateName: _.get(data, 4),
            districtCode: _.get(data, 5),
            districtName: _.get(data, 6),
            townName: _.get(data, 1),
            urbanStatus: _.get(data, 2),
        };
        row++;
        Helper.log('Importing Row: %s', row);
        async.waterfall([
            function (callback) {
                State.findOneAndUpdate(
                    {stateCode: importData.stateCode},
                    {stateCode: importData.stateCode, stateName: importData.stateName},
                    {upsert: true, new: true}
                ).then((state) => {
                    if (_.isNull(state)) {
                        errorObj = Helper.createError('Unable to process the state');
                        return callback(errorObj.message);
                    }
                    callback(null, _.get(state, '_id'));
                }).catch((exception) => {
                    errorObj = Helper.createError(exception);
                    callback(errorObj.message);
                });
            },
            function (stateId, callback) {
                District.findOneAndUpdate(
                    {stateId: stateId, districtCode: importData.districtCode},
                    {districtName: importData.districtName},
                    {upsert: true, new: true}
                ).then((district) => {
                    if (_.isNull(district)) {
                        errorObj = Helper.createError('Unable to process the district');
                        return callback(errorObj.message);
                    }
                    callback(null, _.get(district, '_id'));
                }).catch((exception) => {
                    errorObj = Helper.createError(exception);
                    Helper.log(errorObj);
                });
            },
            function (districtId, callback) {
                Town.findOneAndUpdate(
                    {districtId: districtId, townName: importData.townName},
                    {districtId: districtId, urbanStatus: importData.urbanStatus},
                    {upsert: true, new: true}
                ).then((town) => {
                    if (_.isNull(town)) {
                        errorObj = Helper.createError('Unable to process the town');
                        return callback(errorObj.message);
                    }
                    callback(null);
                }).catch((exception) => {
                    errorObj = Helper.createError(exception);
                    Helper.log(errorObj);
                });
            }
        ], function (error) {
            if (!_.isUndefined(error)) {
                return nextCallback();
            }
            console.log(errorObj);
        });
    }, function () {
        Helper.logTitle('Import Completed');
    });
};