const { createServer } = require('net');
const { connectToServer } = require('./src/server.js');

const main = (path) => {
  const template = './resources/guestBookTemplate.html';
  const commentsFile = './resources/comments.json';
  const server = createServer((socket) => {
    connectToServer(socket, path, commentsFile, template);
  });

  server.listen(8080);
};

main(process.argv[2]);
