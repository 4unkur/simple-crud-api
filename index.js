const http = require('http');
const config = require('./src/config/app');
const App = require('./src/app');

global.app = new App(config);

http.createServer(app.serve())
  .listen(config.port, () => console.log(`Server running at http://localhost:${config.port}`));