const { createHandler } = require('./server/createHandler.js');
const { serveStatic } = require('./server/serveStatic.js');
const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { guestBookRouter } = require('./handlers/guestBookRouter.js');
const { parseParams } = require('./handlers/parseParams.js');
const { logRequest } = require('./handlers/logRequest.js');

const createRouter = (path, comments, template, guestBookPath) => {
  return createHandler(
    logRequest,
    parseParams,
    guestBookRouter(comments, template, guestBookPath),
    serveStatic(path),
    notFoundHandler
  );
};

module.exports = { createRouter };
