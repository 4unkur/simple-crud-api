const http = require('http');
const { port } = require('./app/config/app');

http
  .createServer((req, res) => {
    res.writeHead(200);

    const uri = req.url;

    switch (true) {
      case uri === '/person':
      case uri === '/person/':
        res.write('person index');
        break;
      case uri.includes('/person/'):
        res.write('fetch person');
        break;
    }

    res.end();
  })
  .listen(port, () => console.log(`Server running at http://localhost:${port}`));