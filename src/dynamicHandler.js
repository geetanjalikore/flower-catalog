const fs = require('fs');

const dynamicHandler = ({ uri, params }, response, path, commentsFile) => {
  if (uri === '/guestbook') {
    const { name, comment } = params;
    const date = new Date().toLocaleString();
    const comments = JSON.parse(fs.readFileSync(commentsFile, 'utf8'));

    comments.push({ date, name, comment });
    fs.writeFileSync(commentsFile, JSON.stringify(comments), 'utf8');

    response.statusCode = 302;
    response.setHeader('Location', '/');
    response.send('');
    return true;
  }
  return false;
};

exports.dynamicHandler = dynamicHandler;