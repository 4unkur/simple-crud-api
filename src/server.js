const http = require('http');
const config = require('./utils/config');
const App = require('./app');

global.app = new App(config);
const server = http.createServer(app.serve());

module.exports = server
