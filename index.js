const http = require('http');
const { port } = require('./config')

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello, World!');
});

server.listen(port);