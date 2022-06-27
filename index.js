const { createServer } = require('net');
const { serveFileContents } = require('./src/serveFileContents.js');
const { parseRequest } = require('./src/parser.js');
const { Response } = require('./src/response.js');
const { notFoundError } = require('./src/notFoundError.js');

const createHandler = (handlers) => {
  return (request, response, path) => {
    for (const handler of handlers) {
      if (handler(request, response, path)) {
        return true;
      }
    }
  };
};

const onConnection = (socket, handle, path) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    handle(request, response, path);
  });
};

const main = (path) => {
  const handlers = [serveFileContents, notFoundError];
  const server = createServer((socket) => {
    onConnection(socket, createHandler(handlers), path);
  });

  server.listen(8080);
};

main(process.argv[2]);
