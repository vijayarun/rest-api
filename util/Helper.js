const _ = require('lodash');
const path = require('path');

/**
 * Common Helpers for the application
 *
 * @author A Vijay
 */
module.exports = {
    /**
     *
     */
    log: function () {
        console.log.apply(null, arguments);
    },
    /**
     *
     * @param msg
     * @param isSubTitle
     */
    logTitle: function (msg, isSubTitle) {
        if (typeof msg === 'string') {
            let borderLength = msg.length + 14 * 2,
                borderChar = '-';

            if (isSubTitle === undefined || isSubTitle === false) {
                borderChar = '*';
                this.log(borderChar.repeat(borderLength));
            }
            this.log(borderChar.repeat(14) + msg + borderChar.repeat(14));
            this.log(borderChar.repeat(borderLength));
        }
    },
    /**
     *
     * @param exception
     * @returns {{error: Error, message: *}}
     */
    createError: function (exception) {
        if (typeof exception === 'object') {
            exception = _.get(exception, 'message', 'DEFAULT_EXCEPTION');
        }

        return {error: new Error(exception), message: exception};
    },
};