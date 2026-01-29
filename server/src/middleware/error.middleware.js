import logger from '../utils/logger.js';
import multer from 'multer';

export default function errorMiddleware(err, req, res, next) {
  logger.error('Error occurred:', err);

  // Handle multer errors (file upload errors)
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field. Please use "resume" field for file uploads.'
      });
    }
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`
    });
  }

  // Handle other file type errors
  if (err.message === 'Invalid file type') {
    return res.status(400).json({
      success: false,
      message: 'Invalid file type. Please upload PDF, DOC, or DOCX files only.'
    });
  }

  // Don't send error details in production
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }

  // Send detailed error in development
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    stack: err.stack
  });
}
