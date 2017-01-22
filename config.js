var path = require('path');

module.exports = {
    prod: process.argv.indexOf('--prod') > 0,
    port: 8888,
    host: 'localhost',
    debug: true,

    path_base  : path.resolve(__dirname, '..'),
    dir_client : 'resources/assets/js',
    dir_public   : 'public'
};