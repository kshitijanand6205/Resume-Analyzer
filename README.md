# Resume Analyzer - Optimized

A full-stack resume analysis application with AI-powered insights and ATS scoring.

## 🚀 Optimizations Applied

### Frontend Optimizations
- **Updated Dependencies**: Upgraded to latest stable versions for security and performance
- **Vite Configuration**: Enhanced build optimization with code splitting and chunking
- **Performance**: Added memoization with `useCallback` for better rendering performance
- **Error Handling**: Improved error boundaries and user feedback
- **UI/UX**: Enhanced styling with modern CSS gradients and animations
- **File Validation**: Added client-side file type and size validation

### Backend Optimizations
- **Security**: Enhanced CORS configuration, rate limiting, and helmet security headers
- **Database**: Improved connection pooling and SSL configuration
- **Error Handling**: Comprehensive error handling with proper logging
- **Performance**: Added timeout handling for AI analysis
- **Middleware**: Enhanced authentication middleware with better error messages
- **Logging**: Structured logging for better debugging and monitoring

### Security Enhancements
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Strict origin validation
- **Input Validation**: File type and size validation
- **JWT Security**: Enhanced token validation and expiration handling
- **Content Security**: CSP headers to prevent XSS attacks

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- Vite 6.2.2
- Material-UI (MUI) 7.3.7
- Axios for API calls

### Backend
- Node.js with Express
- MySQL 2 with connection pooling
- JWT for authentication
- Groq AI API integration
- Winston for logging

## 📦 Installation

### Prerequisites
- Node.js 18+
- MySQL database
- Groq API key

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RESUME_ANALYZER
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd server
   npm install
   
   # Frontend
   cd ../client
   npm install
   ```

3. **Environment Configuration**
   Create `.env` files in both `server/` and `client/` directories:

   **Server `.env`:**
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=resume_analyzer
   JWT_SECRET=your_jwt_secret_key
   GROQ_API_KEY=your_groq_api_key
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

   **Client `.env`:**
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **Database Setup**
   ```sql
   CREATE DATABASE resume_analyzer;
   USE resume_analyzer;
   
   -- Users table
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   -- Resumes table
   CREATE TABLE resumes (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     filename VARCHAR(255),
     content TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );
   
   -- Analyses table
   CREATE TABLE analyses (
     id INT AUTO_INCREMENT PRIMARY KEY,
     resume_id INT,
     ats_score INT,
     ai_feedback TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (resume_id) REFERENCES resumes(id)
   );
   ```

5. **Run the application**
   ```bash
   # Backend (in server directory)
   npm run dev
   
   # Frontend (in client directory)
   npm run dev
   ```

## 🎯 Features

- **User Authentication**: Secure JWT-based authentication
- **Resume Upload**: Support for PDF and Word documents
- **Text Analysis**: Paste resume text directly
- **ATS Scoring**: Algorithm-based resume scoring
- **AI Analysis**: Groq-powered AI insights
- **Responsive Design**: Mobile-friendly interface

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/me` - Get current user

### Resume Analysis
- `POST /api/analysis` - Analyze resume (requires authentication)

## 🚀 Performance Features

- **Code Splitting**: Vite optimizes bundle size
- **Caching**: Database connection pooling
- **Rate Limiting**: API protection
- **File Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error management

## 🔒 Security Features

- **CORS Protection**: Strict origin validation
- **Rate Limiting**: Prevents abuse
- **Input Validation**: File type and size limits
- **JWT Security**: Token expiration and validation
- **CSP Headers**: XSS protection

## 📊 Monitoring

- **Structured Logging**: Winston-based logging
- **Error Tracking**: Comprehensive error handling
- **Performance Monitoring**: Built-in performance optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the issues section
- Create a new issue for bugs or feature requests
