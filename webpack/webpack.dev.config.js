var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var { host, port } = require('../config.js');

module.exports = require('./make-webpack-config.js')({
    entry: [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/dev-server'
    ],
    devServer: {
        contentBase: path.join(__dirname, '/static'),
        host: host,
        port: port,
        stats: 'minimal',
        hot: true,
        inline: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './resources/assets/js/index.template.html'
        })
    ],
    output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/'
}
});
