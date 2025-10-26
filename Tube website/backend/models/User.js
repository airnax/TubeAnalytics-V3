import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  picture: String,
  channelId: String,
  accessToken: String,
  refreshToken: String,
  tokenExpiry: Date,
  subscription: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'pro'
  },
  analytics: {
    totalVideosAnalyzed: { type: Number, default: 0 },
    lastAnalysis: Date,
    favoriteChannels: [String]
  },
  settings: {
    notifications: { type: Boolean, default: true },
    theme: { type: String, default: 'dark' }
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ googleId: 1 });
userSchema.index({ email: 1 });

export const User = mongoose.model('User', userSchema);