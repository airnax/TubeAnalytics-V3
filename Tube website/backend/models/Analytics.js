import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videoId: String,
  channelId: String,
  type: {
    type: String,
    enum: ['video', 'channel', 'keyword', 'competitor'],
    required: true
  },
  data: mongoose.Schema.Types.Mixed, // Flexible structure for different analytics
  insights: [{
    type: String,
    category: String,
    confidence: Number
  }],
  recommendations: [{
    type: String,
    priority: { type: String, enum: ['low', 'medium', 'high'] },
    impact: Number
  }],
  processedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
analyticsSchema.index({ userId: 1, processedAt: -1 });
analyticsSchema.index({ videoId: 1 });
analyticsSchema.index({ channelId: 1 });

export const Analytics = mongoose.model('Analytics', analyticsSchema);