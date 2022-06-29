const fs = require('fs');
const { startServer } = require('./src/server/server.js');
const { createRouter } = require('./src/app.js');

const main = (path, guestbook, templateFile) => {
  const template = fs.readFileSync(templateFile, 'utf8');
  const comments = JSON.parse(fs.readFileSync(guestbook, 'utf8'));

  const router = createRouter(path, comments, template);
  startServer(8080, router);
};

const guestbook = 'resources/comments.json';
const templateFile = 'resources/guestBookTemplate.html';

main(process.argv[2], guestbook, templateFile);
