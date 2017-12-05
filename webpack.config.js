module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
	  publicPath: "/",
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      test: /\.jsx?/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
