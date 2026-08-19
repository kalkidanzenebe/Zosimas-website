import { cn } from '../../lib/utils';

export function Section({ children, className, ...props }) {
  return (
    <section
      {...props}
      className={cn(
        'relative w-full max-w-[100vw] overflow-x-hidden py-16 sm:py-20 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-16',
        className,
      )}
    >
      {children}
    </section>
  );
}
