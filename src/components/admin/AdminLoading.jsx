import { LoaderCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminLoading({ label = 'Loading…', className }) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-3 py-16 text-sm text-muted', className)}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle className="h-8 w-8 animate-spin text-teal" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
