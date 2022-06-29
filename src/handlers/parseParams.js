const parseParams = (req, res) => {
  const { searchParams } = req.url;
  const params = {};
  for (const [field, value] of searchParams.entries()) {
    params[field] = value;
  }
  req.url.params = params;
  return false;
};

module.exports = { parseParams };
