const http = require('http');
const config = require('./src/config/app');
const { boot } = require('./src/app');

global.app = boot(config).run;

http.createServer(app)
  .listen(config.port, () => console.log(`Server running at http://localhost:${config.port}`));