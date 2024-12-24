import { HTMLAttributes, ReactNode } from 'react'

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
}

type BaseProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: ReactNode;
}

type DialogTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  className?: string;
  children?: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)} 
        aria-hidden="true"
      />
      <div 
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  )
}

export function DialogContent({ children, className = "", ...props }: BaseProps) {
  return (
    <div
      className={`max-h-[90vh] overflow-y-auto grid gap-4 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function DialogHeader({ className = "", ...props }: BaseProps) {
  return (
    <div
      className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
      {...props}
    />
  )
}

export function DialogTitle({ className = "", ...props }: DialogTitleProps) {
  return (
    <h2
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  )
}

export function DialogFooter({ children, className = "", ...props }: BaseProps) {
    return (
      <div
        className={`flex items-center justify-end gap-2 p-4 border-t ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
  