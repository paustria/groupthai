import nodeExternals from 'webpack-node-externals';
import path from 'path';

export default {
    entry: './src/server/index.js',
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    output: {
        filename: './prod-server.js'
    },
    resolve: {
        root: [
            path.resolve('./src/server')
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
