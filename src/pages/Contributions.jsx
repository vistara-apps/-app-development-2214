import React, { useState } from 'react'
import { BarChart3, TrendingUp, Calendar, DollarSign, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'

const Contributions = () => {
  const [timeRange, setTimeRange] = useState('30d')

  const contributors = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      totalContributions: 1420,
      linesOfCode: 12450,
      complexity: 8.5,
      revenueShare: 2450,
      rank: 1,
      trend: "+12%",
      avatar: "JD"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      totalContributions: 1180,
      linesOfCode: 9820,
      complexity: 7.8,
      revenueShare: 2100,
      rank: 2,
      trend: "+8%",
      avatar: "JS"
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      totalContributions: 950,
      linesOfCode: 8200,
      complexity: 9.2,
      revenueShare: 1850,
      rank: 3,
      trend: "-3%",
      avatar: "AJ"
    },
    {
      id: 4,
      name: "Bob Wilson",
      email: "bob@example.com",
      totalContributions: 780,
      linesOfCode: 6500,
      complexity: 6.5,
      revenueShare: 1200,
      rank: 4,
      trend: "+15%",
      avatar: "BW"
    }
  ]

  const contributionMetrics = [
    {
      title: "Total Contributions",
      value: "4,330",
      change: "+12%",
      icon: <BarChart3 className="h-4 w-4 text-blue-600" />
    },
    {
      title: "Lines of Code",
      value: "36,970",
      change: "+8%",
      icon: <TrendingUp className="h-4 w-4 text-green-600" />
    },
    {
      title: "Revenue Distributed",
      value: "$7,600",
      change: "+15%",
      icon: <DollarSign className="h-4 w-4 text-orange-600" />
    },
    {
      title: "Active Contributors",
      value: "4",
      change: "0%",
      icon: <Award className="h-4 w-4 text-purple-600" />
    }
  ]

  const recentContributions = [
    {
      id: 1,
      contributor: "John Doe",
      type: "Feature",
      description: "Implemented new payment gateway integration",
      linesAdded: 245,
      linesRemoved: 32,
      complexity: 8,
      timestamp: "2024-01-15T14:30:00Z"
    },
    {
      id: 2,
      contributor: "Jane Smith",
      type: "Bug Fix",
      description: "Fixed memory leak in user session handling",
      linesAdded: 15,
      linesRemoved: 8,
      complexity: 6,
      timestamp: "2024-01-15T11:45:00Z"
    },
    {
      id: 3,
      contributor: "Alice Johnson",
      type: "Refactor",
      description: "Optimized database query performance",
      linesAdded: 95,
      linesRemoved: 120,
      complexity: 9,
      timestamp: "2024-01-15T09:20:00Z"
    }
  ]

  const getRankBadge = (rank) => {
    const colors = {
      1: "bg-yellow-100 text-yellow-800 border-yellow-200",
      2: "bg-gray-100 text-gray-800 border-gray-200",
      3: "bg-orange-100 text-orange-800 border-orange-200"
    }
    return colors[rank] || "bg-blue-100 text-blue-800 border-blue-200"
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Feature':
        return 'bg-blue-100 text-blue-800'
      case 'Bug Fix':
        return 'bg-red-100 text-red-800'
      case 'Refactor':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contributions</h1>
          <p className="text-muted-foreground mt-2">
            Track and analyze developer contributions and revenue sharing
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contributionMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className={`text-xs mt-1 ${
                    metric.change.startsWith('+') ? 'text-green-600' : 
                    metric.change.startsWith('-') ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {metric.change} from last period
                  </p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contributors Leaderboard */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contributors Leaderboard</CardTitle>
              <CardDescription>
                Top contributors ranked by overall contribution score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contributors.map((contributor) => (
                  <div key={contributor.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 ${getRankBadge(contributor.rank)}`}>
                        {contributor.rank <= 3 ? (
                          <span className="text-lg">
                            {contributor.rank === 1 ? '🥇' : contributor.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        ) : (
                          contributor.rank
                        )}
                      </div>
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-sm">
                        {contributor.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold">{contributor.name}</h3>
                        <p className="text-sm text-muted-foreground">{contributor.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center text-sm">
                      <div>
                        <p className="font-semibold">{contributor.totalContributions}</p>
                        <p className="text-muted-foreground">Contributions</p>
                      </div>
                      <div>
                        <p className="font-semibold">{contributor.linesOfCode.toLocaleString()}</p>
                        <p className="text-muted-foreground">Lines</p>
                      </div>
                      <div>
                        <p className="font-semibold">{contributor.complexity}</p>
                        <p className="text-muted-foreground">Complexity</p>
                      </div>
                      <div>
                        <p className="font-semibold text-green-600">${contributor.revenueShare}</p>
                        <p className="text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                    <div className={`text-sm px-2 py-1 rounded ${
                      contributor.trend.startsWith('+') ? 'bg-green-100 text-green-800' :
                      contributor.trend.startsWith('-') ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {contributor.trend}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest code contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContributions.map((contribution) => (
                  <div key={contribution.id} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(contribution.type)}`}>
                            {contribution.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            by {contribution.contributor}
                          </span>
                        </div>
                        <p className="text-sm font-medium mb-2">{contribution.description}</p>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <span className="text-green-600">+{contribution.linesAdded}</span>
                          <span className="text-red-600">-{contribution.linesRemoved}</span>
                          <span>Complexity: {contribution.complexity}/10</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(contribution.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Rules */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment Distribution</CardTitle>
              <CardDescription>
                Current revenue sharing rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span>Lines of Code</span>
                  <span className="font-semibold">40%</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Code Complexity</span>
                  <span className="font-semibold">35%</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Review Quality</span>
                  <span className="font-semibold">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Team Collaboration</span>
                  <span className="font-semibold">10%</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Customize Rules
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Contributions