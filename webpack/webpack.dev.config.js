var path = require('path');
var webpack = require('webpack');

var { host, port } = require('../config.js');

module.exports = require('./make-webpack-config.js')({
    entry: [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/dev-server'
    ],
    devServer: {
        contentBase: path.join(__dirname, '../public'),
        host: host,
        port: port,
        stats: 'minimal',
        hot: true,
        inline: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});
