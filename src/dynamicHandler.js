const fs = require('fs');
const { guestBookHandler } = require('./serveFileContents.js');

const dynamicHandler = ({ uri, params },
  response,
  path, commentsFile,
  template) => {

  if (uri === '/guestbook') {
    const { name, comment } = params;
    const date = new Date().toLocaleString();
    const comments = JSON.parse(fs.readFileSync(commentsFile, 'utf8'));

    comments.unshift({ date, name, comment });
    fs.writeFileSync(commentsFile, JSON.stringify(comments), 'utf8');

    const fileName = `${path}${uri}.html`;
    return guestBookHandler(fileName, response, commentsFile, template);
  }
  return false;
};

exports.dynamicHandler = dynamicHandler;
