const { createRouter, notFoundHandler } = require('server');
const { serveStatic } = require('./server/serveStatic.js');
const { guestBookRouter } = require('./handlers/guestBookRouter.js');
const { parseParams } = require('./handlers/parseParams.js');
const { logRequest } = require('./handlers/logRequest.js');

const app = (path, comments, template, guestBookPath) => {
  return createRouter(
    logRequest,
    parseParams,
    guestBookRouter(comments, template, guestBookPath),
    serveStatic(path),
    notFoundHandler
  );
};

module.exports = { app };
