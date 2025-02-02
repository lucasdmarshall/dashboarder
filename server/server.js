const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes");
const studentViewCourseRoutes = require("./routes/student-routes/course-routes");
const studentCoursesRoutes = require("./routes/student-routes/student-courses-routes");
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes");

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/trheinlms';

console.log('Attempting to connect with URI:', MONGO_URI);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log request bodies
app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('Request URL:', req.url);
    console.log('Request Body:', req.body);
  }
  next();
});

// CORS configuration
const allowedOrigins = [process.env.CORS_ORIGIN, 'http://localhost:3002'].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Handle preflight requests
app.options('*', cors());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Dashboarder API' });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/instructor/courses", instructorCourseRoutes);
app.use("/api/student/courses", studentViewCourseRoutes);
app.use("/api/student/my-courses", studentCoursesRoutes);
app.use("/api/student/course-progress", studentCourseProgressRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log('MongoDB Connected:', mongoose.connection.host);
    
    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();
