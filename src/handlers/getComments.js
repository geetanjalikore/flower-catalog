const getComments = (comments) => (req, res) => {
  res.json(comments);
};

module.exports = { getComments };
