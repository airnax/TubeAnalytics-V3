import express from 'express';
import { YouTubeService } from '../services/youtube.js';
import { AIService } from '../services/ai.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Apply authentication to all analyze routes
router.use(authenticateToken);

router.post('/video', async (req, res) => {
  try {
    const { videoUrl } = req.body;
    const accessToken = req.headers.authorization?.split(' ')[1];
    
    // Extract video ID
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    
    // Initialize YouTube service with user's access token
    const youtubeService = new YouTubeService(process.env.YOUTUBE_API_KEY, accessToken);
    
    // Get video data
    const videoData = await youtubeService.getVideoData(videoId);
    
    // Get additional analytics
    const [thumbnailAnalysis, seoScore, predictions] = await Promise.all([
      AIService.analyzeThumbnail(videoData.thumbnail),
      AIService.generateSEOScore(videoData),
      AIService.generatePredictions(videoData)
    ]);
    
    const enhancedData = {
      ...videoData,
      thumbnailAnalysis,
      seoScore,
      predictions,
      analyzedAt: new Date().toISOString()
    };
    
    res.json(enhancedData);
  } catch (error) {
    console.error('Video analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/channel/:channelId', async (req, res) => {
  try {
    const { channelId } = req.params;
    const timeRange = req.query.range || '30d';
    const accessToken = req.headers.authorization?.split(' ')[1];
    
    const youtubeService = new YouTubeService(process.env.YOUTUBE_API_KEY, accessToken);
    const channelData = await youtubeService.getChannelAnalytics(channelId, timeRange);
    
    const predictions = await AIService.predictGrowth(channelData);
    const recommendations = await AIService.generateRecommendations(channelData);
    
    res.json({
      ...channelData,
      predictions,
      recommendations,
      analyzedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Channel analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

function extractVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default router;