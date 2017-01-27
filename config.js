var path = require('path');

module.exports = {
    prod: process.env.NODE_ENV === 'production',
    port: 8888,
    host: 'localhost',
    debug: true,

    path_base  : path.resolve(__dirname, '..'),
    dir_client : 'resources/assets/js',
    dir_public   : 'public'
};