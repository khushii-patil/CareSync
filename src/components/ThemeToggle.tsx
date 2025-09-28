import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="sm"
        className="relative w-10 h-10 p-0 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent/50 transition-all duration-300 hover:scale-105"
      >
        <motion.div
          animate={{
            rotate: theme === 'dark' ? 180 : 0,
            scale: theme === 'dark' ? 0.8 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === 'light' ? (
            <Sun className="w-4 h-4 text-foreground" />
          ) : (
            <Moon className="w-4 h-4 text-foreground" />
          )}
        </motion.div>
        
        {/* Animated background circle */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          }}
          transition={{ duration: 0.3 }}
          style={{ opacity: 0.1 }}
        />
        
        <span className="sr-only">
          {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        </span>
      </Button>
    </motion.div>
  );
}