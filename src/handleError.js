'use strict';

exports.handleError = (res, code, err) => {
  res.status(code).json({
    status: 'false',
    message: err.message || err
  });
}
