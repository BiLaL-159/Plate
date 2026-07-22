function validateRequest(schema) {
  return (req, _res, next) => {
    const errors = [];

    Object.entries(schema).forEach(([field, rules]) => {
      const value = req.body[field];

      rules.forEach((rule) => {
        const message = rule(value, req.body);

        if (message) {
          errors.push({ field, message });
        }
      });
    });

    if (errors.length > 0) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.details = errors;
      next(error);
      return;
    }

    next();
  };
}

module.exports = validateRequest;
