const search = (comments, params) => {
  return comments.find(({ name }) => name === params.name);
};

const searchComment = (comments) => (req, res, next) => {
  const { query } = req;

  const result = search(comments, query);
  res.json(result);
};

module.exports = { searchComment };
