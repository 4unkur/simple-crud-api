const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',
  target: 'node',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  }
};