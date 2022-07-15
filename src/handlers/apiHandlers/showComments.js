const showComments = (comments) => (req, res, next) => {
  if (req.method === 'GET') {
    res.json(comments);
  }
};

exports.showComments = showComments;
