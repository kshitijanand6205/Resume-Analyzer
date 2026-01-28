import logger from './logger.js';

/**
 * Performance monitoring utility for tracking API response times
 */
export const performanceMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
  // Override res.end to capture response time
  const originalEnd = res.end;
  res.end = function(...args) {
    const responseTime = Date.now() - startTime;
    
    // Log performance metrics
    logger.info('API Performance', {
      method: req.method,
      url: req.originalUrl,
      responseTime: `${responseTime}ms`,
      statusCode: res.statusCode,
      userAgent: req.get('User-Agent') || 'Unknown',
      ip: req.ip
    });
    
    // Log slow requests
    if (responseTime > 1000) {
      logger.warn('Slow API Response', {
        method: req.method,
        url: req.originalUrl,
        responseTime: `${responseTime}ms`,
        threshold: '1000ms'
      });
    }
    
    originalEnd.apply(this, args);
  };
  
  next();
};

/**
 * Memory usage monitoring
 */
export const logMemoryUsage = () => {
  const usage = process.memoryUsage();
  logger.info('Memory Usage', {
    rss: `${Math.round(usage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(usage.external / 1024 / 1024)} MB`
  });
};

/**
 * Database connection monitoring
 */
export const monitorDatabase = (pool) => {
  setInterval(() => {
    pool.getConnection()
      .then(connection => {
        logger.debug('Database connection test successful');
        connection.release();
      })
      .catch(err => {
        logger.error('Database connection test failed:', err.message);
      });
  }, 30000); // Test every 30 seconds
};

/**
 * Request size validation middleware
 */
export const validateRequestSize = (req, res, next) => {
  const contentLength = parseInt(req.get('content-length') || '0', 10);
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (contentLength > maxSize) {
    logger.warn('Request size too large', {
      size: `${Math.round(contentLength / 1024)} KB`,
      limit: '10 MB',
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    return res.status(413).json({
      success: false,
      message: 'Request too large. Maximum size is 10MB.'
    });
  }
  
  next();
};