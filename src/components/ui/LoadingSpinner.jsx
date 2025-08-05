import React from 'react'
import { clsx } from 'clsx'

const LoadingSpinner = ({ 
  size = 'default', 
  className = '', 
  text = '',
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const spinner = (
    <div className={clsx('flex items-center justify-center', className)}>
      <div className="flex flex-col items-center space-y-2">
        <div
          className={clsx(
            'animate-spin rounded-full border-2 border-muted-foreground border-t-primary',
            sizeClasses[size]
          )}
          role="status"
          aria-label="Loading"
        />
        {text && (
          <p className="text-sm text-muted-foreground animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    )
  }

  return spinner
}

// Skeleton loading components
export const SkeletonCard = ({ className = '' }) => (
  <div className={clsx('animate-pulse', className)}>
    <div className="bg-muted rounded-lg p-6 space-y-3">
      <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
      <div className="h-8 bg-muted-foreground/20 rounded w-1/2"></div>
      <div className="h-3 bg-muted-foreground/20 rounded w-2/3"></div>
    </div>
  </div>
)

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={clsx('animate-pulse space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={clsx(
          'h-4 bg-muted-foreground/20 rounded',
          i === lines - 1 ? 'w-2/3' : 'w-full'
        )}
      />
    ))}
  </div>
)

export const SkeletonButton = ({ className = '' }) => (
  <div className={clsx('animate-pulse', className)}>
    <div className="h-10 bg-muted-foreground/20 rounded-md w-24"></div>
  </div>
)

export default LoadingSpinner
