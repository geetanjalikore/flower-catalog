const fs = require('fs');
const { startServer } = require('./src/server/server.js');
const { createRouter } = require('./src/app.js');

const main = ({ path, guestbook, templateFile }) => {
  const template = fs.readFileSync(templateFile, 'utf8');
  const comments = JSON.parse(fs.readFileSync(guestbook, 'utf8'));

  const router = createRouter(path, comments, template, guestbook);
  startServer(8080, router);
};

const config = {
  guestbook: 'resources/comments.json',
  templateFile: 'resources/guestBookTemplate.html',
  path: './public'
};

main(config);
