const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => ({
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: './public/js/bundle.js'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      test: /\.jsx?/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('./public/css/styles.css')
  ],
  devtool: env === 'production' ? 'source-map' : 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
});
