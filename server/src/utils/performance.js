import logger from './logger.js';

export function performanceMiddleware(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}

export function validateRequestSize(req, res, next) {
  const contentLength = parseInt(req.headers['content-length'], 10);
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (contentLength && contentLength > maxSize) {
    return res.status(413).json({
      success: false,
      message: 'Request too large'
    });
  }
  
  next();
}