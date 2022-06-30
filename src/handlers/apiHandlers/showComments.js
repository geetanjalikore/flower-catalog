const showComments = ({ comments }, res) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(comments));
  return true;
};
exports.showComments = showComments;
