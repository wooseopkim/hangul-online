module.exports = {
  entry: './copy-static.js',
  output: {
    filename: 'copy-static.bundle.js'
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