const { startServer } = require('server');
const { app } = require('./src/app');

const main = () => {
  const config = {
    guestbook: 'resources/comments.json',
    templateFile: 'resources/guestBookTemplate.html',
    path: './public',
    usersPath: 'resources/users.json'
  };

  startServer(8080, app(config, {}, console.log));
};

main();
