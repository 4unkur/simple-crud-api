const http = require('http');
const config = require('./config');
const App = require('./app');

global.app = new App(config);
const server = http.createServer(app.serve());

module.exports = server
