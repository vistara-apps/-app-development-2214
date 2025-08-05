import OpenAI from 'openai'

class AIReviewService {
  constructor() {
    this.client = new OpenAI({
      apiKey: "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",
      baseURL: "https://openrouter.ai/api/v1",
      dangerouslyAllowBrowser: true,
    })
  }

  async reviewCode(codeContent) {
    try {
      const prompt = `As an expert code reviewer, analyze the following code and provide feedback:

${codeContent}

Please provide:
1. Overall code quality score (1-10)
2. Specific issues or improvements
3. Security concerns
4. Performance optimization suggestions
5. Best practices recommendations

Format your response as constructive feedback for a developer.`

      const completion = await this.client.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "system",
            content: "You are an expert software engineer and code reviewer. Provide constructive, actionable feedback on code quality, security, performance, and best practices."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })

      const review = completion.choices[0].message.content
      
      // Parse the AI response and structure it
      const suggestions = this.parseReviewResponse(review)
      const score = this.extractScore(review)

      return {
        score,
        suggestions,
        fullReview: review,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('AI review failed:', error)
      throw new Error('Failed to get AI review. Please try again.')
    }
  }

  parseReviewResponse(review) {
    // Parse the AI response to extract structured feedback
    const suggestions = []
    
    // Look for common patterns in the response
    const lines = review.split('\n')
    
    lines.forEach(line => {
      line = line.trim()
      if (!line) return
      
      // Check for different types of feedback
      if (line.toLowerCase().includes('error') || line.toLowerCase().includes('bug') || line.toLowerCase().includes('issue')) {
        suggestions.push({
          type: 'error',
          message: line.replace(/^\d+\.?\s*/, '').replace(/^-\s*/, '')
        })
      } else if (line.toLowerCase().includes('warning') || line.toLowerCase().includes('concern')) {
        suggestions.push({
          type: 'warning',
          message: line.replace(/^\d+\.?\s*/, '').replace(/^-\s*/, '')
        })
      } else if (line.toLowerCase().includes('suggest') || line.toLowerCase().includes('improve') || line.toLowerCase().includes('consider')) {
        suggestions.push({
          type: 'suggestion',
          message: line.replace(/^\d+\.?\s*/, '').replace(/^-\s*/, '')
        })
      }
    })
    
    // If no specific suggestions found, create general ones
    if (suggestions.length === 0) {
      suggestions.push({
        type: 'suggestion',
        message: 'Code review completed. Consider the full analysis for detailed feedback.'
      })
    }
    
    return suggestions.slice(0, 5) // Limit to 5 suggestions
  }

  extractScore(review) {
    // Try to extract a score from the review
    const scoreMatch = review.match(/score[:\s]*(\d+(?:\.\d+)?)[\/\s]*(?:10|out\s+of\s+10)/i)
    if (scoreMatch) {
      return parseFloat(scoreMatch[1])
    }
    
    // Default scoring based on content analysis
    const positiveWords = ['good', 'excellent', 'well', 'clean', 'proper']
    const negativeWords = ['error', 'issue', 'problem', 'bad', 'poor', 'security']
    
    let positiveCount = 0
    let negativeCount = 0
    
    const lowerReview = review.toLowerCase()
    positiveWords.forEach(word => {
      if (lowerReview.includes(word)) positiveCount++
    })
    negativeWords.forEach(word => {
      if (lowerReview.includes(word)) negativeCount++
    })
    
    // Calculate a score based on positive/negative sentiment
    let score = 7 // Base score
    score += positiveCount * 0.5
    score -= negativeCount * 0.8
    
    return Math.max(1, Math.min(10, Math.round(score * 10) / 10))
  }
}

export default new AIReviewService()