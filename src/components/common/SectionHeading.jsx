import { Reveal } from '../motion/Reveal';
import { cn } from '../../lib/utils';

export function Badge({ children, className, light = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]',
        light ? 'text-cyan' : 'text-teal',
        className,
      )}
    >
      <span className={cn('h-px w-6', light ? 'bg-cyan/70' : 'bg-teal')} aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
}) {
  const aligned = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={cn('flex max-w-2xl flex-col gap-4', aligned, className)}>
      {eyebrow && (
        <Reveal>
          <Badge light={light}>{eyebrow}</Badge>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className={cn('text-3xl font-bold tracking-tight sm:text-4xl', light ? 'text-white' : 'text-ink')}>
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p className={cn('text-base leading-relaxed sm:text-lg', light ? 'text-white/70' : 'text-muted')}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
