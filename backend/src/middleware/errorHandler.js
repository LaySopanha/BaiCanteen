const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: Object.values(err.errors).map(error => error.message)
      });
    }
  
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate key error'
      });
    }
  
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  };
  
  module.exports = errorHandler;