/*
 * process.env.NODE_ENV - used to determine whether we generate a production or development bundle
 *
 * webpack --env.browser - used to determine whether to generate a browser or server bundle
 *
 * NOTE: browser/server is client/server-side rendering respectively in universal/isomorphic javascript
 *
 */
const path = require('path')

module.exports = {
  entry: './app/client.jsx',
  
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, '../public/assets/')
    },
  
    resolve: {
      extensions: ['.js', '.jsx']
    },
  
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader'
        },
        {
          test: /\.js$|\.jsx$/,
          loader: 'babel-loader',
          exclude: [/node_modules/]
        }
      ]
    }
}