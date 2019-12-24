const path = require('path');
// const Config = require('config');

let _root = path.resolve(__dirname, '..');

module.exports = {
    PATH: {
        ROOT: _root,
        DATA: path.resolve(_root, 'data'),
        MODELS: path.resolve(_root, 'models'),
    }
};