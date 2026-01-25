import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import analysisRoutes from './routes/analysis.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import requireAuth from "./middleware/auth.middleware.js";

const app = express();



// Global middleware
app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/me", requireAuth, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
  });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/analysis', analysisRoutes);

// Error handling
app.use(errorMiddleware);

app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});

export default app;