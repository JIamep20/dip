var webpack = require('webpack');
var path = require('path');
var Copy = require('copy-webpack-plugin');
var CleanCSS = require('clean-css');

var { debug, prod } = require('../config.js');

prod ? console.log('Building app with prodaction flag') : console.log('Building app without prodaction app');

module.exports = function (options = {}) {

    var entry = ['./resources/assets/js/index.js'];
    if(options.entry)
        entry = entry.concat(options.entry);

    var output = {
            path: path.join(__dirname, '..', 'public', 'assets'),
            publicPath: '/assets/',
            filename: "bundle.js"
        };

    if(options.output)
        output = Object.assign({}, output, options.output);

    var module = {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/.node_modules/, /public/],
                loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0']
            },
            {
                test: /\.scss/,
                loader: "style-loader!css-loader?sourceMap!sass-loader?sourceMap"
            },
            {
                test: /\.css/,
                loader: "style-loader!css-loader?sourceMap"
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader'
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    };

    if(options.module) {
        if(options.module.loaders)
            module.loaders.push(options.module.loaders);

        if(options.module.preLoaders)
            module.preLoaders.push(options.module.preLoaders);

        if(options.module.postLoaders)
            module.postLoaders.push(options.module.postLoaders);
    }

    var plugins = [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new Copy([{
            from: path.join('resources', 'assets', 'sass', 'preloader.css'),
            transform: function (c, p) {
                return prod ? new CleanCSS().minify(c).styles : c;
            }
        },{
            from: path.join('resources', 'assets', 'sass', 'bootstrap.min.css')
        }]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ];

    if(options.plugins)
        plugins = plugins.concat(options.plugins);

    var resolve = {
        root: [path.resolve('./resources/assets/js/')]
    };
    if(options.resolve)
        resolve = Object.assign({}, resolve, options.resolve);

    return {
        entry: entry,
        output: output,
        module:module,
        plugins: plugins,
        resolve: resolve,
        debug: debug,
        devtool: options.devtool || prod ? 'source-map' : 'cheap-inline-module-source-map',
        devServer: options.devServer || {}
    };

};