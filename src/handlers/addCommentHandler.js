const fs = require('fs');

function addCommentHandler(req, res, guestBookPath) {
  const { comments } = req;
  const { params } = req.url;
  params.date = new Date().toLocaleString();
  comments.unshift(params);
  fs.writeFileSync(guestBookPath, JSON.stringify(comments), 'utf8');

  res.statusCode = 302;
  res.setHeader('Location', '/guestbook.html');
  res.end('');

  return true;
}

module.exports = { addCommentHandler };
