import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <div className="gradient-primary rounded-lg p-1.5">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">NutriTrack</h1>
        </div>
        <span className="text-xs text-muted-foreground hidden sm:block">Advanced Nutrition Monitoring</span>
      </div>
    </header>
  );
}
