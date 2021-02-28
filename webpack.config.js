module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/i,
        use: ['raw-loader', 'sass-loader']
      }
    ]
  },
  mode: 'production'
}
