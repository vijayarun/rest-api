const mongoose = require('mongoose');

const Helper = require('./Helper');

class MongoDBHelper {
    connect() {
        return new Promise((resolve, reject) => {
            mongoose.connect('mongodb://127.0.0.1/rest-api', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });

            const db = mongoose.connection;
            db.on('error', function (error) {
                Helper.log('Mongo Connection Error');
                reject(error);
            });
            db.once('open', function () {
                Helper.logTitle('Mongo Connected');

                resolve(db);
            });
        });
    }
}

module.exports = new MongoDBHelper();