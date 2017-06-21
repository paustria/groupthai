var nodeExternals = require('webpack-node-externals'),
  path = require('path');

module.exports = {
  target: 'node',
  devtool: 'inline-source-map',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
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
