const fs = require('fs');

const addCommentHandler = (req, res, guestBookPath) => {
  const { comments, bodyParams, session } = req;
  bodyParams.name = session.username;
  bodyParams.date = new Date().toLocaleString();
  comments.unshift(bodyParams);

  const commentsString = JSON.stringify(comments);
  fs.writeFileSync(guestBookPath, commentsString, 'utf8');
  res.statusCode = 201
  res.end('Added comment successfully');
};

module.exports = { addCommentHandler };
