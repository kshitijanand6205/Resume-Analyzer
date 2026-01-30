import "dotenv/config";   
import app from './app.js';

const PORT = process.env.PORT || 4000;

// Log the allowed origins for debugging
console.log('CORS Allowed Origins:', process.env.FRONTEND_URL || 'localhost:5173');
console.log('Production Frontend URL:', process.env.PRODUCTION_FRONTEND_URL || 'Not set');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
