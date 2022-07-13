const search = (comments, params) => {
  return comments.find(({ name }) => name === params.name);
};

const searchComment = ({ comments, url }, res) => {
  const { params } = url;

  res.setHeader('content-type', 'application/json');
  const result = search(comments, params);
  res.end(JSON.stringify(result));
  return true;
};

module.exports = { searchComment };
