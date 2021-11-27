const server = require('./src/server');

server.listen(
  app.config.port,
  () => console.log(`Server running at http://localhost:${app.config.port}`)
);
