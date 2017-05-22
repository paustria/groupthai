var nodeExternals = require('webpack-node-externals'),
path = require('path');

module.exports = {
  entry: './src/server/index.js',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, ''),
    filename: 'prod-server.js'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src/server'),
      'node_modules'
    ]
  },
  module: {
    rules: [
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
