const path = require('path')

const options = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      }
    ]
  },
  entry: {
    'eg-renderer': './src/eg-renderer',
    'eg-renderer-ogdf': './src/eg-renderer-ogdf'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  plugins: [
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    port: 8083
  },
  node: {
    fs: 'empty'
  }
}

module.exports = options
