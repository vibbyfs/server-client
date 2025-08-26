function validate(schema, target = 'body') {
  return (req, res, next) => {
    const src = target === 'query' ? req.query : target === 'params' ? req.params : req.body;
    const { error, value } = schema.validate(src, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
    }
    if (target === 'query') req.query = value;
    else if (target === 'params') req.params = value;
    else req.body = value;
    next();
  };
}

module.exports = { validate };
