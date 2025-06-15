const { validationResult } = require('express-validator');

const validate = (schemas) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({ success: false, message: 'Validasi gagal', errors: errors.array() });
};

module.exports = validate; 