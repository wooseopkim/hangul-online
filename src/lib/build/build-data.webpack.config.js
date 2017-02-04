module.exports = {
  entry: './build-data.js',
  output: {
    filename: 'build-data.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }    
    ]
  },
  target: "node"
}