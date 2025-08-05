import React, { useState } from 'react'
import { Code, Clock, CheckCircle, AlertTriangle, User, Bot } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import AIReviewService from '../services/AIReviewService'

const CodeReview = () => {
  const [activeTab, setActiveTab] = useState('pending')
  const [selectedReview, setSelectedReview] = useState(null)
  const [codeInput, setCodeInput] = useState('')
  const [aiReview, setAiReview] = useState(null)
  const [loading, setLoading] = useState(false)

  const reviews = [
    {
      id: 1,
      title: "Add user authentication middleware",
      author: "John Doe",
      status: "pending",
      type: "ai_pending",
      createdAt: "2024-01-15T10:30:00Z",
      linesChanged: 120,
      filesChanged: 3,
      complexity: "medium",
      description: "Implementation of JWT-based authentication middleware for API routes"
    },
    {
      id: 2,
      title: "Refactor payment processing logic",
      author: "Jane Smith",
      status: "in_review",
      type: "human_review",
      createdAt: "2024-01-14T15:45:00Z",
      linesChanged: 240,
      filesChanged: 5,
      complexity: "high",
      description: "Complex payment flow requiring human oversight for security validation",
      reviewer: "Alice Johnson"
    },
    {
      id: 3,
      title: "Update CSS styles for dashboard",
      author: "Bob Wilson",
      status: "completed",
      type: "ai_completed",
      createdAt: "2024-01-13T09:15:00Z",
      linesChanged: 45,
      filesChanged: 2,
      complexity: "low",
      description: "Minor styling updates - handled by AI review",
      aiFindings: ["Consistent naming conventions", "No styling conflicts detected", "Mobile responsive"]
    }
  ]

  const handleAIReview = async () => {
    if (!codeInput.trim()) return
    
    setLoading(true)
    try {
      const review = await AIReviewService.reviewCode(codeInput)
      setAiReview(review)
    } catch (error) {
      console.error('AI review failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'in_review':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredReviews = reviews.filter(review => {
    switch (activeTab) {
      case 'pending':
        return review.status === 'pending'
      case 'in_progress':
        return review.status === 'in_review'
      case 'completed':
        return review.status === 'completed'
      default:
        return true
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Code Review</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered and human code reviews for quality assurance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bot className="w-4 h-4 mr-2" />
            AI Review
          </Button>
          <Button>
            <User className="w-4 h-4 mr-2" />
            Request Human Review
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {['pending', 'in_progress', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Review Cards */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <Card 
                key={review.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedReview?.id === review.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedReview(review)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(review.status)}
                        <h3 className="font-semibold">{review.title}</h3>
                        {review.type.includes('ai') ? 
                          <Bot className="h-4 w-4 text-blue-600" /> :
                          <User className="h-4 w-4 text-purple-600" />
                        }
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{review.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>By {review.author}</span>
                        <span>{review.linesChanged} lines</span>
                        <span>{review.filesChanged} files</span>
                        {review.reviewer && <span>Reviewer: {review.reviewer}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getComplexityColor(review.complexity)}`}>
                        {review.complexity}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Review Details / AI Review Panel */}
        <div className="space-y-4">
          {/* AI Review Tool */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-600" />
                AI Code Review
              </CardTitle>
              <CardDescription>
                Get instant feedback on your code changes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Code to Review</label>
                <textarea
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                  placeholder="Paste your code here..."
                />
              </div>
              <Button 
                onClick={handleAIReview} 
                disabled={loading || !codeInput.trim()}
                className="w-full"
              >
                {loading ? 'Analyzing...' : 'Analyze Code'}
              </Button>
              
              {aiReview && (
                <div className="mt-4 space-y-3">
                  <h4 className="font-medium">AI Analysis Results</h4>
                  <div className="p-3 bg-muted rounded-md space-y-2">
                    <p className="text-sm"><strong>Overall Score:</strong> {aiReview.score}/10</p>
                    <div className="space-y-2">
                      {aiReview.suggestions.map((suggestion, index) => (
                        <div key={index} className="text-sm">
                          <span className={`px-1 py-0.5 rounded text-xs mr-2 ${
                            suggestion.type === 'error' ? 'bg-red-100 text-red-800' :
                            suggestion.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {suggestion.type}
                          </span>
                          {suggestion.message}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Selected Review Details */}
          {selectedReview && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedReview.title}</CardTitle>
                <CardDescription>Review Details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedReview.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Status:</span>
                    <p className="capitalize">{selectedReview.status.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <span className="font-medium">Complexity:</span>
                    <p className="capitalize">{selectedReview.complexity}</p>
                  </div>
                  <div>
                    <span className="font-medium">Lines Changed:</span>
                    <p>{selectedReview.linesChanged}</p>
                  </div>
                  <div>
                    <span className="font-medium">Files Changed:</span>
                    <p>{selectedReview.filesChanged}</p>
                  </div>
                </div>

                {selectedReview.aiFindings && (
                  <div>
                    <h4 className="font-medium mb-2">AI Findings</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {selectedReview.aiFindings.map((finding, index) => (
                        <li key={index} className="text-muted-foreground">{finding}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Request Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default CodeReview