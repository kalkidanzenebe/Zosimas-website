import { Container } from '../common/Container';
import { Badge } from '../common/SectionHeading';
import { DigitalNetwork } from '../common/DigitalNetwork';
import { GeometricPattern } from '../common/GeometricPattern';
import { cn } from '../../lib/utils';
import { Reveal } from '../motion/Reveal';

export function PageHero({
  eyebrow,
  title,
  description,
  dark = false,
  visual = 'network',
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20',
        dark ? 'bg-navy-dark text-white' : 'bg-surface text-ink',
      )}
    >
      <div className="pointer-events-none absolute -right-16 top-8 hidden w-[340px] opacity-40 lg:block">
        {visual === 'network' ? (
          <DigitalNetwork variant={dark ? 'cta' : 'compact'} density="low" />
        ) : visual === 'pattern' ? (
          <GeometricPattern dark={dark} className="text-navy" />
        ) : null}
      </div>
      <Container className="relative max-w-3xl">
        <Reveal>
          <Badge light={dark}>{eyebrow}</Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={0.14}>
            <p className={cn('mt-5 text-base leading-relaxed sm:text-lg', dark ? 'text-white/70' : 'text-muted')}>
              {description}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
