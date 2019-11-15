const { createErrorObject } = require('./hadleError');

exports.checkContentType = (req, res, next) => {
  const contentType = req.headers['content-type'];

  if(contentType !== 'application/json') {
    res.status(404).json(new createErrorObject(415, null));
  }

  next();
}
