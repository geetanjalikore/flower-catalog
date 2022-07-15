const { commentsHtml } = require('./createCommentsHtml.js');

const showGuestBook = (comments, template) => (req, res) => {
  const result = template.replace('__COMMENTS__', commentsHtml(comments));
  res.end(result);
};

exports.showGuestBook = showGuestBook;
