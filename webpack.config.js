var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path');

module.exports = {
    entry: ['whatwg-fetch', './src/client/index.js'],
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src/client'),
            'node_modules'
        ],
        extensions: ['.js', '.json', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ['url-loader?limit=10000&minetype=application/font-woff']
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ['file-loaderj']
            }
        ]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/client/index.html'
        }),
        new ExtractTextPlugin('/css/core.css')
    ]
};
