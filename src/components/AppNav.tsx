import { LayoutDashboard, Utensils, Dumbbell, Activity, CalendarDays, BarChart3, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AppView = 'dashboard' | 'food' | 'workouts' | 'calisthenics' | 'calendar' | 'analytics' | 'insights';

export const NAV_ITEMS: { id: AppView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard',    label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'food',         label: 'Food Log',      icon: Utensils },
  { id: 'workouts',     label: 'Workouts',      icon: Dumbbell },
  { id: 'calisthenics', label: 'Calisthenics',  icon: Activity },
  { id: 'calendar',     label: 'Calendar',      icon: CalendarDays },
  { id: 'analytics',    label: 'Analytics',     icon: BarChart3 },
  { id: 'insights',     label: 'Insights',      icon: Lightbulb },
];

interface Props {
  view: AppView;
  onChange: (v: AppView) => void;
}

export function DesktopSidebar({ view, onChange }: Props) {
  return (
    <aside className="hidden lg:flex w-56 shrink-0 flex-col border-r border-border bg-card/50 sticky top-14 h-[calc(100vh-3.5rem)] py-4 px-3">
      <nav className="flex flex-col gap-1" aria-label="Primary">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left',
                active
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon className={cn('h-4 w-4', active && 'text-primary')} strokeWidth={2.25} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto px-3 py-3 rounded-lg bg-gradient-to-br from-primary/10 to-info/10 border border-primary/15">
        <p className="text-[11px] font-semibold text-foreground">Stay consistent 💪</p>
        <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
          Small daily logs compound into big results.
        </p>
      </div>
    </aside>
  );
}

export function MobileBottomNav({ view, onChange }: Props) {
  // Show 5 most-used on mobile bottom bar
  const mobile = NAV_ITEMS.filter(i => i.id !== 'calendar' && i.id !== 'insights');
  return (
    <nav
      aria-label="Primary mobile"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 glass border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-5 max-w-md mx-auto">
        {mobile.map(item => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function MoreMenu({ view, onChange }: Props) {
  // Mobile-only access to the items hidden from bottom nav
  const extra = NAV_ITEMS.filter(i => i.id === 'calendar' || i.id === 'insights');
  return (
    <div className="lg:hidden flex gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
      {extra.map(item => {
        const Icon = item.icon;
        const active = view === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap',
              active
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:text-foreground'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
