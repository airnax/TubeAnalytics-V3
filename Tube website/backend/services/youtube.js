import { google } from 'googleapis';

export class YouTubeService {
  constructor(apiKey, accessToken = null) {
    if (accessToken) {
      this.youtube = google.youtube({
        version: 'v3',
        auth: new google.auth.OAuth2()
      });
      this.youtube.defaults.headers = {
        Authorization: `Bearer ${accessToken}`
      };
    } else {
      this.youtube = google.youtube({
        version: 'v3',
        auth: apiKey
      });
    }
  }

  async getVideoData(videoId) {
    try {
      const response = await this.youtube.videos.list({
        part: 'snippet,statistics,contentDetails,status',
        id: videoId
      });
      
      if (!response.data.items || response.data.items.length === 0) {
        throw new Error('Video not found');
      }
      
      return this.formatVideoData(response.data.items[0]);
    } catch (error) {
      console.error('YouTube API error:', error);
      throw new Error(`Failed to fetch video data: ${error.message}`);
    }
  }

  async getChannelAnalytics(channelId, timeRange = '30d') {
    try {
      // Get channel statistics
      const channelResponse = await this.youtube.channels.list({
        part: 'snippet,statistics,contentDetails',
        id: channelId
      });

      if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
        throw new Error('Channel not found');
      }

      const channel = channelResponse.data.items[0];
      return this.formatChannelData(channel);
    } catch (error) {
      console.error('Channel analytics error:', error);
      throw new Error(`Failed to fetch channel analytics: ${error.message}`);
    }
  }

  formatVideoData(video) {
    const stats = video.statistics;
    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url,
      channelTitle: video.snippet.channelTitle,
      channelId: video.snippet.channelId,
      publishedAt: video.snippet.publishedAt,
      views: parseInt(stats.viewCount || 0),
      likes: parseInt(stats.likeCount || 0),
      comments: parseInt(stats.commentCount || 0),
      duration: video.contentDetails.duration,
      engagementRate: this.calculateEngagementRate(
        parseInt(stats.likeCount || 0),
        parseInt(stats.commentCount || 0),
        parseInt(stats.viewCount || 1)
      )
    };
  }

  formatChannelData(channel) {
    const stats = channel.statistics;
    return {
      id: channel.id,
      title: channel.snippet.title,
      description: channel.snippet.description,
      customUrl: channel.snippet.customUrl,
      publishedAt: channel.snippet.publishedAt,
      thumbnails: channel.snippet.thumbnails,
      subscribers: parseInt(stats.subscriberCount || 0),
      views: parseInt(stats.viewCount || 0),
      videos: parseInt(stats.videoCount || 0),
      country: channel.snippet.country
    };
  }

  calculateEngagementRate(likes, comments, views) {
    return ((likes + comments) / Math.max(views, 1) * 100).toFixed(2);
  }
}