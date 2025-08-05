import React, { createContext, useContext, useState, useEffect } from 'react'

const ProjectContext = createContext()

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [currentProject, setCurrentProject] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    setLoading(true)
    // Simulate API call
    const mockProjects = [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Next-gen e-commerce solution',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        status: 'active',
        developers: [
          { id: 1, name: 'John Doe', email: 'john@example.com', experienceLevel: 'Senior' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', experienceLevel: 'Mid' }
        ],
        tasks: [
          { id: 1, name: 'User Authentication', description: 'Implement OAuth2', status: 'completed', difficultyLevel: 3 },
          { id: 2, name: 'Payment Integration', description: 'Stripe payment gateway', status: 'in_progress', difficultyLevel: 4 }
        ]
      },
      {
        id: 2,
        name: 'Data Analytics Dashboard',
        description: 'Real-time analytics platform',
        startDate: '2024-02-01',
        endDate: '2024-08-31',
        status: 'active',
        developers: [
          { id: 3, name: 'Alice Johnson', email: 'alice@example.com', experienceLevel: 'Senior' }
        ],
        tasks: [
          { id: 3, name: 'Chart Components', description: 'Interactive data visualization', status: 'pending', difficultyLevel: 2 }
        ]
      }
    ]
    
    setProjects(mockProjects)
    if (mockProjects.length > 0 && !currentProject) {
      setCurrentProject(mockProjects[0])
    }
    setLoading(false)
  }

  const createProject = async (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      status: 'active',
      developers: [],
      tasks: []
    }
    setProjects([...projects, newProject])
    return newProject
  }

  const updateProject = async (projectId, updates) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, ...updates } : p
    ))
  }

  const deleteProject = async (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId))
    if (currentProject?.id === projectId) {
      setCurrentProject(projects.find(p => p.id !== projectId) || null)
    }
  }

  const value = {
    projects,
    currentProject,
    setCurrentProject,
    loading,
    createProject,
    updateProject,
    deleteProject,
    loadProjects
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}