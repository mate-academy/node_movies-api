'use strict';

const { handleError } = require('./handleError');

exports.checkContentType = (req, res, next) => {
  const contentType = req.headers['content-type'];

  if (contentType !== 'application/json') {
    handleError(res, 400, 'Content-Type is not JSON');
  } else {
    next();
  }
}
