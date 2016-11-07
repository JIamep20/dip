var webpack = require('webpack');
var gutil = require('gulp-util');

const prod = gutil.env.prod;

module.exports = {
    entry: "./resources/assets/js/app.js",
    output: {
        path: __dirname + '/public/js/',
        publicPath: "js/",
        filename: "bundle.js",
        stats: 'errors-only'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/.node_modules/, /public/],
                loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react']
            }
        ]
    },
    plugins: prod ? [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
        : [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin()
    ],
    devServer: {
        stats: 'errors-only',
        contentBase: 'public'
    }
};