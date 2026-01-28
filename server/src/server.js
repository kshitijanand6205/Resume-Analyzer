import "dotenv/config";   
import app from './app.js';
import logger from './utils/logger.js';
import { logMemoryUsage, monitorDatabase } from './utils/performance.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 3000;

// Memory usage monitoring (every 5 minutes)
setInterval(logMemoryUsage, 5 * 60 * 1000);

// Database monitoring
monitorDatabase(pool);

// Graceful shutdown handling
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  logger.info('Performance monitoring enabled');
});
