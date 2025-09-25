import { motion } from "motion/react";
import { Leaf } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export function LoadingSpinner({ 
  message = "Loading...", 
  size = "md", 
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const containerClass = fullScreen 
    ? "fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    : "flex items-center justify-center min-h-[200px]";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className={`${sizeClasses[size]} border-2 border-primary/20 rounded-full`} />
          <div className={`${sizeClasses[size]} border-2 border-primary border-t-transparent rounded-full absolute inset-0`} />
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Leaf className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm">{message}</span>
        </motion.div>
      </div>
    </div>
  );
}