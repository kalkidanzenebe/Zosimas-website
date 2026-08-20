import { Container } from '../common/Container';
import { Badge } from '../common/SectionHeading';
import { DigitalNetwork } from '../common/DigitalNetwork';
import { GeometricPattern } from '../common/GeometricPattern';
import { RemoteImage } from '../cards/BlogCard';
import { cn } from '../../lib/utils';
import { Reveal } from '../motion/Reveal';

export function PageHero({
  eyebrow,
  title,
  description,
  dark = false,
  visual = 'network',
  image,
  imageAlt = '',
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20',
        dark ? 'bg-navy-dark text-white' : 'bg-surface text-ink',
      )}
    >
      {image ? (
        <div className="pointer-events-none absolute inset-0">
          <RemoteImage src={image} alt={imageAlt} className="h-full w-full object-cover" />
          <div
            className={cn(
              'absolute inset-0',
              dark
                ? 'bg-[linear-gradient(90deg,rgba(7,27,58,0.88)_12%,rgba(7,27,58,0.55)_100%)] dark:bg-[linear-gradient(90deg,rgba(10,12,16,0.9)_12%,rgba(26,34,46,0.62)_100%)]'
                : 'bg-[linear-gradient(90deg,rgba(245,248,252,0.94)_8%,rgba(245,248,252,0.62)_100%)] dark:bg-[linear-gradient(90deg,rgba(17,21,27,0.94)_8%,rgba(17,21,27,0.62)_100%)]',
            )}
          />
        </div>
      ) : (
        <div className="pointer-events-none absolute -right-16 top-8 hidden w-[340px] opacity-40 lg:block">
          {visual === 'network' ? (
            <DigitalNetwork variant={dark ? 'cta' : 'compact'} density="low" />
          ) : visual === 'pattern' ? (
            <GeometricPattern dark={dark} className="text-navy dark:text-ink" />
          ) : null}
        </div>
      )}
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
