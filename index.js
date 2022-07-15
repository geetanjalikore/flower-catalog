const { createApp } = require('./src/app.js');

const main = () => {
  const config = {
    guestbook: 'resources/comments.json',
    templateFile: 'resources/guestBookTemplate.html',
    path: './public',
    usersPath: 'resources/users.json'
  };

  const port = 8080;
  const app = createApp(config, {}, console.log);
  app.listen(port, () => console.log(`listening on ${port}`));
};

main();
