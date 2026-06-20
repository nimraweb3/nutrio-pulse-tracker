import { useState } from 'react';
import { LayoutDashboard, Utensils, Dumbbell, Activity, CalendarDays, BarChart3, Lightbulb, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export type AppView = 'dashboard' | 'food' | 'workouts' | 'calisthenics' | 'calendar' | 'analytics' | 'insights';

export const NAV_ITEMS: { id: AppView; label: string; icon: typeof LayoutDashboard; hint: string }[] = [
  { id: 'dashboard',    label: 'Dashboard',     icon: LayoutDashboard, hint: 'Daily overview' },
  { id: 'food',         label: 'Food Log',      icon: Utensils,        hint: 'Meals & macros' },
  { id: 'workouts',     label: 'Workouts',      icon: Dumbbell,        hint: 'Cardio & gym' },
  { id: 'calisthenics', label: 'Calisthenics',  icon: Activity,        hint: 'No-equipment routine' },
  { id: 'calendar',     label: 'Calendar',      icon: CalendarDays,    hint: 'Monthly history' },
  { id: 'analytics',    label: 'Analytics',     icon: BarChart3,       hint: 'Trends & charts' },
  { id: 'insights',     label: 'Insights',      icon: Lightbulb,       hint: 'Tips & nudges' },
];

interface Props {
  view: AppView;
  onChange: (v: AppView) => void;
}

function NavList({ view, onChange, onItemClick }: Props & { onItemClick?: () => void }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {NAV_ITEMS.map(item => {
        const Icon = item.icon;
        const active = view === item.id;
        return (
          <button
            key={item.id}
            onClick={() => { onChange(item.id); onItemClick?.(); }}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left w-full',
              active
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent'
            )}
          >
            <Icon className={cn('h-4 w-4 shrink-0', active && 'text-primary')} strokeWidth={2.25} />
            <span className="flex-1 min-w-0">
              <span className="block leading-tight">{item.label}</span>
              <span className="block text-[10px] font-normal opacity-70 leading-tight">{item.hint}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function DesktopSidebar({ view, onChange }: Props) {
  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-card/50 sticky top-14 h-[calc(100vh-3.5rem)] py-4 px-3">
      <NavList view={view} onChange={onChange} />
      <div className="mt-auto px-3 py-3 rounded-lg bg-gradient-to-br from-primary/10 to-info/10 border border-primary/15">
        <p className="text-[11px] font-semibold text-foreground">Stay consistent 💪</p>
        <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
          Small daily logs compound into big results.
        </p>
      </div>
    </aside>
  );
}

export function MobileNavTrigger({ view, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const activeItem = NAV_ITEMS.find(n => n.id === view);
  const Icon = activeItem?.icon ?? Menu;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden gap-2 px-2"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
          <span className="hidden xs:inline-flex items-center gap-1.5 text-xs font-semibold">
            <Icon className="h-3.5 w-3.5 text-primary" />
            {activeItem?.label}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 flex flex-col">
        <div className="p-4 border-b border-border bg-gradient-to-br from-primary/5 to-info/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Menu</p>
              <h2 className="text-lg font-display text-foreground">NIM Fitness</h2>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <NavList view={view} onChange={onChange} onItemClick={() => setOpen(false)} />
        </div>
        <div className="p-3 border-t border-border">
          <div className="px-3 py-3 rounded-lg bg-gradient-to-br from-primary/10 to-info/10 border border-primary/15">
            <p className="text-[11px] font-semibold text-foreground">Stay consistent 💪</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
              Small daily logs compound into big results.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
