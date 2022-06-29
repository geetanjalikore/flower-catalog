const { createHandler } = require('./server/router.js');
const { serveStatic } = require('./server/serveStatic.js');
const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { guestBookHandler } = require('./handlers/guestBookHandler.js');
const { parseParams } = require('./handlers/parseParams.js');

const createRouter = (path, comments, template, guestBookPath) => {
  return createHandler(
    parseParams,
    guestBookHandler(comments, template, guestBookPath),
    serveStatic(path),
    notFoundHandler
  );
};

module.exports = { createRouter };
