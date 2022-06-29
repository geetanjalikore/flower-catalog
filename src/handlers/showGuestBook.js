const { commentsHtml } = require('./createCommentsHtml.js');

const showGuestBook = ({ comments }, res, template) => {
  const result = template.replace('__COMMENTS__', commentsHtml(comments));

  res.setHeader('content-type', 'text/html');
  res.setHeader('content-length', result.length);
  res.end(result);
  return true;
};
exports.showGuestBook = showGuestBook;
