const { serveFileContents } = require('./serveFileContents.js');
const { parseRequest } = require('./parser.js');
const { Response } = require('./response.js');
const { notFoundHandler } = require('./notFoundHandler.js');
const { dynamicHandler } = require('./dynamicHandler.js');

const createHandler = (handlers) => {
  return (request, response, path, commentsFile, template) => {
    for (const handler of handlers) {
      if (handler(request, response, path, commentsFile, template)) {
        return true;
      }
    }
  };
};

const onConnection = (socket, handle, path, commentsFile, template) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    handle(request, response, path, commentsFile, template);
  });
};

const connectToServer = (socket, path, commentsFile, template) => {
  const handlers = [dynamicHandler, serveFileContents, notFoundHandler];
  onConnection(socket, createHandler(handlers), path, commentsFile, template);
};

module.exports = { connectToServer };
