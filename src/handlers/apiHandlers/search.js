const search = (comments, params) => {
  return comments.find(({ name }) => name === params.name);
};

const searchComment = (comments) => (req, res) => {
  const { method, url, query } = req;

  if (method === 'GET') {
    const result = search(comments, query);
    res.json(result);
  }
};

module.exports = { searchComment };
