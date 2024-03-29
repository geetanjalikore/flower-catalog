const { createApp } = require('./src/app.js');

const main = () => {
  const config = {
    guestbook: 'resources/comments.json',
    templateFile: 'resources/guestBookTemplate.html',
    path: './public',
    usersPath: 'resources/users.json',
    sessionsPath: 'sessions.js'
  };

  const port = 8080;
  const sessions = {};
  const app = createApp(config, sessions);

  app.listen(port, () => console.log(`listening on ${port}`));
};

main();
