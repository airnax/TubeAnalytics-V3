import OpenAI from 'openai';

export class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.a14538b65aa74d47e8fbc751b3ad3c2eb9c50b12416ace1901d2d34411486fdb
    });
  }

  async analyzeThumbnail(thumbnailUrl) {
    try {
      const prompt = `
        Analyze this YouTube thumbnail and provide insights on:
        1. Visual appeal (1-10 score)
        2. Emotional impact
        3. Key elements that stand out
        4. Potential improvements
        5. Click-through-rate prediction
        
        Thumbnail URL: ${thumbnailUrl}
        
        Respond in JSON format with these fields:
        - score (number)
        - emotionalImpact (string)
        - standoutElements (array of strings)
        - improvements (array of strings)
        - predictedCTR (string: low/medium/high)
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: thumbnailUrl } }
            ]
          }
        ],
        max_tokens: 1000
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Thumbnail analysis error:', error);
      return this.getDefaultThumbnailAnalysis();
    }
  }

  async generateSEOScore(videoData) {
    try {
      const prompt = `
        Analyze this YouTube video for SEO optimization:
        
        Title: ${videoData.title}
        Description: ${videoData.description?.substring(0, 500)}...
        Views: ${videoData.views}
        Likes: ${videoData.likes}
        Comments: ${videoData.comments}
        
        Provide SEO analysis with:
        - overallScore (1-100)
        - titleScore (1-10)
        - descriptionScore (1-10)
        - keywordUsage (array of objects with keyword and relevance)
        - recommendations (array of strings)
        
        Respond in JSON format.
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('SEO analysis error:', error);
      return this.getDefaultSEOScore();
    }
  }

  async generatePredictions(videoData) {
    try {
      const prompt = `
        Based on this YouTube video data, predict future performance:
        
        Current views: ${videoData.views}
        Likes: ${videoData.likes}
        Comments: ${videoData.comments}
        Published: ${videoData.publishedAt}
        Engagement rate: ${videoData.engagementRate}%
        
        Provide predictions for:
        - viewsIn30Days (number)
        - growthPotential (low/medium/high)
        - optimalPublishTime (string)
        - suggestedTopics (array of strings)
        
        Respond in JSON format.
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 600
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Prediction error:', error);
      return this.getDefaultPredictions();
    }
  }

  // Fallback methods if AI service fails
  getDefaultThumbnailAnalysis() {
    return {
      score: 7,
      emotionalImpact: "neutral",
      standoutElements: ["title", "contrast"],
      improvements: ["Add more contrast", "Include human face"],
      predictedCTR: "medium"
    };
  }

  getDefaultSEOScore() {
    return {
      overallScore: 75,
      titleScore: 8,
      descriptionScore: 6,
      keywordUsage: [],
      recommendations: ["Improve description length", "Add more relevant tags"]
    };
  }

  getDefaultPredictions() {
    return {
      viewsIn30Days: 10000,
      growthPotential: "medium",
      optimalPublishTime: "Friday 2-4 PM",
      suggestedTopics: ["related content ideas"]
    };
  }
}