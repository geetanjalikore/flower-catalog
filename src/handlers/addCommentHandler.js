const fs = require('fs');

const addComment = (comments, guestBookPath) =>
  (req, res) => {
    const { body, session } = req;

    body.name = session.username;
    body.date = new Date().toLocaleString();
    comments.unshift(body);

    const commentsString = JSON.stringify(comments);
    fs.writeFileSync(guestBookPath, commentsString, 'utf8');
    res.statusCode = 201
    res.end('Added comment successfully');
  };

module.exports = { addComment };
