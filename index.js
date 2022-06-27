const { createServer } = require('net');
const { serveFileContents } = require('./src/serveFileContents.js');
const { parseRequest } = require('./src/parser.js');
const { Response } = require('./src/response.js');

const onConnection = (socket, handler, path) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    console.log(request);
    const response = new Response(socket);
    handler(request, response, path);
  });
};

const main = (path) => {
  const server = createServer((socket) => {
    onConnection(socket, serveFileContents, path);
  });

  server.listen(8080);
};

main(process.argv[2]);
