import React, { useState } from 'react'
import { Shield, Code, Users, DollarSign, CheckCircle, Star } from 'lucide-react'
import Button from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'

const Landing = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      onLogin()
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: <Code className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Code Review",
      description: "Automated scanning of code changes using advanced AI to detect issues and improvements"
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Human Oversight",
      description: "Expert human reviewers provide in-depth analysis for complex code changes"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-purple-600" />,
      title: "Contribution Tracking",
      description: "Automatically monitor and quantify each developer's code contributions"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-orange-600" />,
      title: "Fair Revenue Sharing",
      description: "Customizable payment splitting based on individual contribution levels"
    }
  ]

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per developer/month",
      features: ["AI-powered code review", "Basic contribution tracking", "Email support", "Up to 5 projects"]
    },
    {
      name: "Professional",
      price: "$49",
      period: "per developer/month",
      features: ["All Starter features", "Human code review", "Advanced analytics", "Custom payment rules", "Priority support"]
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per developer/month",
      features: ["All Professional features", "Custom integrations", "Dedicated support", "On-premise deployment", "SLA guarantee"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CodeSentry</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode ? 'Sign Up' : 'Login'}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Accelerate Code Quality with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Boost developer productivity and improve code quality with our AI-driven code review platform. 
          Track contributions and enable fair revenue sharing based on actual work done.
        </p>
        
        {/* Auth Form */}
        <Card className="max-w-md mx-auto mb-12">
          <CardHeader>
            <CardTitle>{isLoginMode ? 'Sign In' : 'Create Account'}</CardTitle>
            <CardDescription>
              {isLoginMode ? 'Welcome back to CodeSentry' : 'Join thousands of developers using CodeSentry'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' : isLoginMode ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose CodeSentry?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={index === 1 ? "ring-2 ring-blue-500" : ""}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-blue-600">
                  {plan.price}
                  <span className="text-sm text-gray-500">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Star className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" variant={index === 1 ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 CodeSentry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing