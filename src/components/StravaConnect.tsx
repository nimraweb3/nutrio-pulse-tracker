import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Activity, ExternalLink, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function StravaConnect() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">Strava</p>
            <p className="text-[11px] text-muted-foreground truncate">Auto-sync runs &amp; rides</p>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={() => setOpen(true)} className="gap-1">
          <Zap className="h-3.5 w-3.5" /> Connect
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-500" /> Connect Strava
            </DialogTitle>
            <DialogDescription>
              To activate auto-sync, create a free Strava API app and share the credentials with us.
            </DialogDescription>
          </DialogHeader>
          <ol className="text-sm space-y-2 list-decimal pl-5">
            <li>Open <a className="text-primary underline" href="https://www.strava.com/settings/api" target="_blank" rel="noreferrer">Strava API settings <ExternalLink className="inline h-3 w-3" /></a></li>
            <li>Create an app named <b>NIM Fitness</b>, Category <b>Training</b></li>
            <li>Set <b>Authorization Callback Domain</b> to <code className="bg-secondary px-1 rounded">nutrio-pulse-tracker.lovable.app</code></li>
            <li>Copy your <b>Client ID</b> and <b>Client Secret</b></li>
            <li>Paste them in the chat — once added, your activities will sync automatically and burned calories will increase your daily intake target.</li>
          </ol>
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-foreground">
            Send your Client ID &amp; Secret in the chat and we'll activate the sync immediately.
          </div>
          <Button variant="outline" onClick={() => { navigator.clipboard.writeText('nutrio-pulse-tracker.lovable.app'); toast.success('Domain copied'); }}>
            Copy callback domain
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
