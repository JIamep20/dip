var webpack = require('webpack');

var { host, port } = require('../config.js');

module.exports = require('./make-webpack-config.js')({
    entry: [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/only-dev-server'
    ],
    devServer: {
        contentBase: host + ':' + port,
        host: host,
        port: port,
        stats: 'minimal',
        hot: true,
        inline: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    output: {
        publicPath: 'http://localhost:8888/assets/'
    }
});