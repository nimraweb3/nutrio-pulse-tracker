import { Dumbbell, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const { signOut, user } = useAuth();
  return (
    <header className="border-b border-border bg-card sticky top-0 z-40">
      <div className="container flex items-center justify-between h-14 px-4 max-w-7xl">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary rounded-md p-2 shadow-cute">
            <Dumbbell className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base font-display text-foreground leading-none tracking-tight">My Fitness</h1>
            <p className="text-[10px] text-muted-foreground font-semibold tracking-wide uppercase mt-0.5">
              NUTRITION · WORKOUT&nbsp;
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user && (
            <>
              <span className="text-xs text-muted-foreground hidden sm:inline font-medium truncate max-w-[160px]">
                {user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={signOut} aria-label="Sign out">
                <LogOut className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
