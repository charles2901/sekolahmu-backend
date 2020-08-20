function errorHandler(err, req, res, next) {
    let error = "INTERNAL_SERVER_ERROR";
    let errorMessages = "Internal Server Error";
    let errorStatus = 500;
  
    if (err.name === "AUTHORIZATION_FAILED") {
      error = "AUTHORIZATION_FAILED";
      errorMessages = "You have no authority"
      errorStatus = 400;
    } else if(err.name === 'INVALID_EMAIL_PASSWORD'){
      error = 'INVALID_EMAIL_PASSWORD'
      errorMessages = 'Invalid Email or Password'
      errorStatus = 404
    } else if(err.name === 'TOKEN_NOT_FOUND'){
      error = 'TOKEN_NOT_FOUND'
      errorMessages = 'Token not found. Please login first'
      errorStatus = 404
    } else if(err.name === 'AUTHENTICATION_FAILED'){
      error = 'AUTHENTICATION_FAILED'
      errorMessages = 'Invalid token. Please relogin'
      errorStatus = 400
    } else if(err.name === "NOT_FOUND"){
      error = "CLASS_NOT_FOUND"
      errorMessages = "Class is not found"
      errorStatus = 404
    }
    
  
    res.status(errorStatus).json({
      error,
      errorMessages,
    });
  }
  
module.exports = errorHandler;