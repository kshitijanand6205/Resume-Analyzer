# Resume Analyzer - AI-Powered Resume Analysis Tool

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A beginner-friendly full-stack application that analyzes resumes using AI and provides ATS (Applicant Tracking System) scoring.**

## 🎯 What This Project Does

This application helps job seekers improve their resumes by providing:
- **Smart ATS Analysis**: Multi-factor scoring system (keywords, sections, experience, skills)
- **AI-Powered Insights**: Groq AI integration for detailed feedback
- **Flexible Input**: Upload PDF/DOC files or paste resume text
- **User-Friendly**: Clean interface with real-time feedback

## 🚀 Quick Start (For Beginners)

### Prerequisites
- **Node.js** (version 20 or higher) - [Download here](https://nodejs.org/)
- **MySQL** database - [Download here](https://dev.mysql.com/downloads/)
- **Basic understanding** of command line

### 1. Get the Project
```bash
# Clone the repository
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer
```

### 2. Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd client
npm install
```

### 3. Set Up Database
```sql
-- Open MySQL and run these commands:
CREATE DATABASE resume_analyzer;

-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create resumes table
CREATE TABLE resumes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  filename VARCHAR(255),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create analyses table
CREATE TABLE analyses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resume_id INT,
  ats_score INT,
  strengths TEXT,
  weaknesses TEXT,
  suggestions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resume_id) REFERENCES resumes(id)
);
```

### 4. Configure Environment
Create `.env` file in the `server/` folder:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=resume_analyzer

# Security (Generate your own secret!)
JWT_SECRET=your-super-secret-jwt-key-make-it-random-and-long

# AI Integration (Optional - skip if you don't have API key)
GROQ_API_KEY=your_groq_api_key_here

# Application
PORT=4000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 5. Run the Application
```bash
# Start backend server (in server/ folder)
cd server
npm run dev

# Start frontend (in new terminal, client/ folder)
cd client
npm run dev
```

**Visit:** http://localhost:5173

## 📱 How to Use

### 1. Create Account
- Go to http://localhost:5173
- Click "Register" and create your account
- Log in with your credentials

### 2. Analyze Your Resume
- Click "Analyze Resume"
- **Option 1**: Upload PDF, DOC, or DOCX file (max 5MB)
- **Option 2**: Paste your resume text (min 50 characters)
- **Optional**: Add job description for tailored analysis
- Click "Analyze Resume"

### 3. View Results
- **ATS Score**: 0-100 score with color coding
- **Strengths**: What your resume does well
- **Weaknesses**: Areas to improve
- **Suggestions**: Specific recommendations

## 🛠️ Project Structure

### Frontend (`client/`)
```
client/
├── src/
│   ├── components/     # Reusable components
│   │   ├── ResumeForm.jsx      # Upload/paste resume
│   │   └── ResultCard.jsx      # Display analysis results
│   ├── pages/          # Main pages
│   │   ├── Login.jsx           # User login
│   │   ├── Register.jsx        # User registration
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   └── Analyze.jsx         # Resume analysis page
│   ├── auth/           # Authentication
│   │   ├── AuthContext.jsx     # User state management
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── api/            # API calls
│   │   ├── axiosInstance.js    # HTTP client setup
│   │   └── resumeApi.js        # Resume analysis API
│   └── App.jsx         # Main app component
```

### Backend (`server/`)
```
server/
├── src/
│   ├── controllers/    # Request handlers
│   │   ├── auth.controller.js      # User authentication
│   │   ├── resume.controller.js    # Resume operations
│   │   └── analysis.controller.js  # Analysis logic
│   ├── services/       # Business logic
│   │   ├── ai.service.js           # Groq AI integration
│   │   ├── ats.service.js          # ATS scoring algorithm
│   │   ├── auth.service.js         # Authentication logic
│   │   └── pdf.service.js          # PDF parsing
│   ├── models/         # Database models
│   │   ├── user.model.js           # User schema
│   │   ├── resume.model.js         # Resume schema
│   │   └── analysis.model.js       # Analysis results schema
│   ├── routes/         # API endpoints
│   │   ├── auth.routes.js          # Authentication routes
│   │   ├── resume.routes.js        # Resume routes
│   │   └── analysis.routes.js      # Analysis routes
│   ├── middleware/     # Middleware functions
│   │   ├── auth.middleware.js      # JWT authentication
│   │   ├── upload.middleware.js    # File upload handling
│   │   └── error.middleware.js     # Error handling
│   ├── utils/          # Utility functions
│   │   ├── jwt.js                  # JWT utilities
│   │   ├── logger.js               # Logging setup
│   │   └── performance.js          # Performance monitoring
│   ├── config/         # Configuration
│   │   └── db.js                   # Database connection
│   ├── app.js          # Express app setup
│   └── server.js       # Server startup
```

## 🔧 Key Features Explained

### ATS Scoring Algorithm
The ATS score is calculated using 4 factors:
1. **Keyword Matching (40%)**: Industry-standard tech keywords
2. **Section Completeness (25%)**: Resume structure and sections
3. **Experience Relevance (20%)**: Relevant experience indicators
4. **Skills Match (15%)**: Skills alignment with job requirements

### AI Analysis
Uses Groq AI with Llama 3 model to provide:
- Detailed strengths analysis
- Specific weaknesses identification
- Actionable improvement suggestions
- Job-specific feedback

### File Processing
- **PDF Support**: Extracts text from PDF files
- **File Validation**: Checks file type and size
- **Error Handling**: Clear error messages for invalid files

## 🎨 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Resume Analysis
![Analysis](https://via.placeholder.com/800x400?text=Analysis+Page+Screenshot)

### Results
![Results](https://via.placeholder.com/800x400?text=Results+Screenshot)

## 🚀 Deployment

### Local Development
```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

### Production Build
```bash
# Build frontend
cd client
npm run build

# Start backend in production
cd server
NODE_ENV=production npm start
```

## 🐛 Troubleshooting

### Common Issues

**"Cannot find module" errors:**
```bash
# Make sure you're in the right directory
cd server  # or cd client
npm install
```

**Database connection errors:**
- Check MySQL is running
- Verify database credentials in `.env`
- Ensure database exists

**Port already in use:**
```bash
# Change PORT in server/.env
PORT=4001  # or any other available port
```

**CORS errors:**
- Check `FRONTEND_URL` in server/.env matches your frontend URL
- Ensure both frontend and backend are running

### Getting Help
1. Check the [Issues](https://github.com/your-username/resume-analyzer/issues) section
2. Review error messages in browser console and terminal
3. Verify all environment variables are set correctly

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/resume-analyzer.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes
5. **Test** your changes locally
6. **Commit** your changes: `git commit -m 'Add amazing feature'`
7. **Push** to your fork: `git push origin feature/amazing-feature`
8. **Create** a Pull Request

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add comments for complex logic
- Test your changes before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq** - For providing powerful AI models
- **Material-UI** - For excellent React components
- **Express.js** - For reliable backend framework
- **MySQL** - For robust database management

## 📞 Support

- **Questions?** Create an [Issue](https://github.com/your-username/resume-analyzer/issues)
- **Documentation:** Check the [Wiki](https://github.com/your-username/resume-analyzer/wiki)
- **Community:** Join our [Discussions](https://github.com/your-username/resume-analyzer/discussions)

---

**Built with ❤️ for job seekers everywhere**

**Note:** This is a beginner-friendly project. Don't worry if you're new to web development - the code is well-commented and the setup is straightforward!