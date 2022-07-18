const showComments = (comments) => (req, res, next) => {
  res.json(comments);
};

exports.showComments = showComments;
