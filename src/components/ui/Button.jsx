import React from 'react'
import { clsx } from 'clsx'

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 shadow-sm hover:shadow-md": variant === "default",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90": variant === "secondary",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/90": variant === "outline",
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/90": variant === "ghost",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95 shadow-sm hover:shadow-md": variant === "destructive"
        },
        {
          "h-10 px-4 py-2 gap-2": size === "default",
          "h-9 rounded-md px-3 gap-1.5 text-xs": size === "sm",
          "h-11 rounded-md px-8 gap-2 text-base": size === "lg",
          "h-10 w-10 p-0": size === "icon"
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button
