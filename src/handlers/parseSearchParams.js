const parseSearchParams = (req, res, next) => {
  const { searchParams } = req.url;
  const params = {};
  for (const [field, value] of searchParams.entries()) {
    params[field] = value;
  }
  req.url.params = params;
  next();
};

module.exports = { parseSearchParams };
