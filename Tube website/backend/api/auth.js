import express from 'express';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.75575807743-du4q8c2fn7mrg7ja138hrpp9dsf6u82l.apps.googleusercontent.com,
  process.env.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,
  process.env.FRONTEND_URL + '/auth/callback'
);

// Generate auth URL
router.get('/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/yt-analytics.readonly',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    prompt: 'consent'
  });
  res.json({ authUrl });
});

// Handle callback
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    // Create JWT token
    const token = jwt.sign(
      { 
        id: userInfo.data.id, 
        email: userInfo.data.email,
        name: userInfo.data.name,
        picture: userInfo.data.picture 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  } catch (error) {
    console.error('Auth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
  }
});

// Verify token middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export default router;