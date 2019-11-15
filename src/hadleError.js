exports.createErrorObject = function(code, err) {
  this.statusCode = code;
  this.error = err;
  switch (code) {
    case 500: 
      this.errorDescription = 'Error read file data.json';
      break;
    case 404: 
      this.errorDescription = 'Error films id not found';
      break;
    case 415:
        this.errorDescription = 'Error Content-Type not application/json';
      break;
    default:
      this.errorDescription = 'Error without description'; 
  }
}
