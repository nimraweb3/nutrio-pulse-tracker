import { Heart, LogOut, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { signOut, user } = useAuth();
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex items-center justify-between h-14 px-4">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5"
        >
          <div className="gradient-primary rounded-xl p-2 shadow-md">
            <Heart className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight leading-none">NIM Fitness Tracker</h1>
            <p className="text-[10px] text-muted-foreground">Your Complete Fitness Monitor</p>
          </div>
        </motion.div>
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-muted-foreground hidden sm:block font-medium"
          >
            🇵🇰 Personalized for You
          </motion.span>
          {user && (
            <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
