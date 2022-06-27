const fs = require('fs');

const dynamicHandler = ({ uri, params }, response, path) => {
  const file = './resources/comments.json';

  if (uri === '/guestbook') {
    const { name, comment } = params;
    const date = new Date().toLocaleString();
    const comments = JSON.parse(fs.readFileSync(file, 'utf8'));

    comments.push({ date, name, comment });
    fs.writeFileSync(file, JSON.stringify(comments), 'utf8');

    response.statusCode = 302;
    response.setHeader('Location', '/');
    response.send('');
    return true;
  }
  return false;
};

exports.dynamicHandler = dynamicHandler;
