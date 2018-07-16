const http = require('http');
const app = require('./index');

const port = process.env.PORT || 3006;

const server = http.createServer(app);

server.listen(port);