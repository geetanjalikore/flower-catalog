const { commentsHtml } = require('./createCommentsHtml.js');

const showGuestBook = ({ comments }, res, template) => {
  const result = template.replace('__COMMENTS__', commentsHtml(comments));
  res.setHeader('content-type', 'text/html');
  res.end(result);
};

exports.showGuestBook = showGuestBook;
