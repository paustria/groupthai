var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['whatwg-fetch', './app/app.js'],
    output: {
        path: './public',
        filename: '/bundle.js'
    },
    resolve: {},
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css!sass')
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loaderj' }
        ],
        postLoaders: [{
            include: /node_modules\/mapbox-gl/,
            loader: 'transform',
            query: 'brfs'
        }]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        new ExtractTextPlugin('/css/core.css')
    ]
};
