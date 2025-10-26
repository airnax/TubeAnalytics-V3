import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoutes from './api/analyze.js';
import authRoutes from './api/auth.js';
import { connectDatabase } from './services/database.js';

// Connect to database
connectDatabase();

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/analyze', analyzeRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 TubeAnalytics backend running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});