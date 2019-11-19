'use strict';

const { handleError } = require('./handleError');

exports.checkContentType = (req, res, next) => {
  const contentType = req.headers['content-type'];

  if (contentType !== 'application/json') {
    handleError(res, 404, 'Content-Type is not b049a473-2b08-4624-9583-4c50511edc5e');
  }

  next();
}
