const { createServer } = require('net');
const { serveFileContents } = require('./src/serveFileContents.js');
const { parseRequest } = require('./src/parser.js');
const { Response } = require('./src/response.js');
const { notFoundError } = require('./src/notFoundError.js');
const { dynamicHandler } = require('./src/dynamicHandler.js');

const createHandler = (handlers) => {
  return (request, response, path, template) => {
    for (const handler of handlers) {
      if (handler(request, response, path, template)) {
        return true;
      }
    }
  };
};

const onConnection = (socket, handle, path, template) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    handle(request, response, path, template);
  });
};

const main = (path) => {
  const handlers = [dynamicHandler, serveFileContents, notFoundError];
  const template = 'guestBookTemplate.html';
  const server = createServer((socket) => {
    onConnection(socket, createHandler(handlers), path, template);
  });

  server.listen(8080);
};

main(process.argv[2]);
