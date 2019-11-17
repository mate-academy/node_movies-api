'use strict';

const { createErrorObject, hadleError } = require('./hadleError');

exports.checkContentType = (req, res, next) => {
  const contentType = req.headers['content-type'];

  if (contentType !== 'application/json') {
    hadleError(res, 404, 'Content-Type is not b049a473-2b08-4624-9583-4c50511edc5e');
  }

  next();
}
