import React from 'react'
import { BarChart3, Code, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useProject } from '../contexts/ProjectContext'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const { projects, currentProject } = useProject()
  const { user } = useAuth()

  const stats = [
    {
      title: "Active Projects",
      value: projects.filter(p => p.status === 'active').length,
      icon: <BarChart3 className="h-4 w-4 text-blue-600" />,
      change: "+2 this month"
    },
    {
      title: "Code Reviews",
      value: "24",
      icon: <Code className="h-4 w-4 text-green-600" />,
      change: "+12% this week"
    },
    {
      title: "Team Members",
      value: projects.reduce((acc, p) => acc + p.developers.length, 0),
      icon: <Users className="h-4 w-4 text-purple-600" />,
      change: "+3 new members"
    },
    {
      title: "Revenue Share",
      value: "$2,450",
      icon: <TrendingUp className="h-4 w-4 text-orange-600" />,
      change: "+8% increase"
    }
  ]

  const recentActivity = [
    {
      type: "code_review",
      title: "Code review completed for Payment Integration",
      time: "2 hours ago",
      status: "completed"
    },
    {
      type: "contribution",
      title: "New contribution tracked: 150 lines of code",
      time: "4 hours ago",
      status: "tracked"
    },
    {
      type: "team",
      title: "Alice Johnson joined the Data Analytics project",
      time: "1 day ago",
      status: "joined"
    },
    {
      type: "payment",
      title: "Revenue share distributed to team members",
      time: "2 days ago",
      status: "completed"
    }
  ]

  const pendingTasks = [
    {
      id: 1,
      title: "Review API refactoring pull request",
      project: "E-commerce Platform",
      priority: "high",
      dueDate: "Today"
    },
    {
      id: 2,
      title: "Analyze contribution metrics for Q1",
      project: "Data Analytics Dashboard",
      priority: "medium",
      dueDate: "Tomorrow"
    },
    {
      id: 3,
      title: "Configure payment rules for new project",
      project: "Mobile App",
      priority: "low",
      dueDate: "This week"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your projects today.
          </p>
        </div>
        <Button>
          <Code className="w-4 h-4 mr-2" />
          Start Code Review
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your projects and team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {activity.type === 'code_review' && <Code className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'contribution' && <BarChart3 className="h-4 w-4 text-green-600" />}
                    {activity.type === 'team' && <Users className="h-4 w-4 text-purple-600" />}
                    {activity.type === 'payment' && <TrendingUp className="h-4 w-4 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>
              Items requiring your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.project}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Project Overview */}
      {currentProject && (
        <Card>
          <CardHeader>
            <CardTitle>Current Project: {currentProject.name}</CardTitle>
            <CardDescription>
              {currentProject.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {currentProject.tasks.length}
                </p>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {currentProject.tasks.filter(t => t.status === 'completed').length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {currentProject.developers.length}
                </p>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Dashboard