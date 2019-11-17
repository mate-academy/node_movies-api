'use strict';

exports.hadleError = (res, code, err) => {

  res.status(code).json({
    status: 'false',
    message: err.message || err
  });
}
