const fs = require('fs');
const { startServer } = require('server');
const { app } = require('./src/app');

const main = ({ path, guestbook, templateFile, userCredentialsPath }) => {
  const template = fs.readFileSync(templateFile, 'utf8');
  const comments = JSON.parse(fs.readFileSync(guestbook, 'utf8'));
  const users = JSON.parse(fs.readFileSync(userCredentialsPath, 'utf8'));

  startServer(8080, app(
    path,
    comments,
    template,
    guestbook,
    users,
    userCredentialsPath
  ));
};

const config = {
  guestbook: 'resources/comments.json',
  templateFile: 'resources/guestBookTemplate.html',
  path: './public',
  userCredentialsPath: 'resources/creadentials.json'
};

main(config);
