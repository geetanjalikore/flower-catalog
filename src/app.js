const { createHandler } = require('./server/router.js');
const { serveStatic } = require('./server/serveStatic.js');
const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { guestBookHandler } = require('./handlers/guestBookHandler.js');

const createRouter = (path, comments, template, guestBookPath) => {
  return createHandler(
    guestBookHandler(comments, template, guestBookPath),
    serveStatic(path),
    notFoundHandler
  );
};

module.exports = { createRouter };
