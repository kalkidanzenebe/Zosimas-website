import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { Badge } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ServiceVisual } from '../common/ServiceVisual';
import { localizedServices } from '../../i18n/data';
import { cn } from '../../lib/utils';
import { Reveal } from '../motion/Reveal';
import { useI18n } from '../../hooks/useI18n';

export function ServicesPreview() {
  const { t, locale } = useI18n();
  const services = localizedServices(locale);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const viewportRef = useRef(null);
  const draggingRef = useRef(false);
  const prefersReduced = useReducedMotion();
  const active = services[index];
  const count = services.length;

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return undefined;
    const update = () => setWidth(node.offsetWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (draggingRef.current) return;
      setIndex((current) => (current + 1) % count);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [count]);

  const goTo = (next) => {
    setIndex((next + count) % count);
  };

  const paginate = (direction) => {
    goTo(index + direction);
  };

  const onDragEnd = (_event, info) => {
    draggingRef.current = false;
    const threshold = Math.max(64, width * 0.16);
    if (info.offset.x < -threshold || info.velocity.x < -500) {
      paginate(1);
    } else if (info.offset.x > threshold || info.velocity.x > 500) {
      paginate(-1);
    }
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-x-hidden bg-navy-dark py-16 text-white lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(19,184,178,0.14),transparent_32%),radial-gradient(circle_at_88%_80%,rgba(24,199,192,0.1),transparent_28%)]" />
      <svg className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full opacity-40" viewBox="0 0 1200 120" aria-hidden="true">
        <path d="M0 72 L160 40 L320 80 L500 28 L680 70 L860 32 L1040 64 L1200 44" fill="none" stroke="#13B8B2" strokeWidth="1" />
        <circle cx="320" cy="80" r="3.5" fill="#18C7C0" />
        <circle cx="680" cy="70" r="3.5" fill="#18C7C0" />
        <circle cx="1040" cy="64" r="3.5" fill="#18C7C0" />
      </svg>

      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Badge light>{t('homeServices.eyebrow')}</Badge>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
                {t('homeServices.title')}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                {t('homeServices.description')}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="flex items-center gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                aria-label={t('common.previousService')}
                onClick={() => paginate(-1)}
                className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-cyan hover:text-cyan"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={t('common.nextService')}
                onClick={() => paginate(1)}
                className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-cyan hover:text-cyan"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <Button to="/services" variant="ghost" arrow>
              {t('common.allServices')}
            </Button>
          </Reveal>
        </div>

        <div
          ref={viewportRef}
          className="mt-14 overflow-hidden"
          aria-roledescription="carousel"
          aria-label={t('common.servicesCarousel')}
          aria-live="polite"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') paginate(1);
            if (event.key === 'ArrowLeft') paginate(-1);
          }}
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            drag={prefersReduced || width === 0 ? false : 'x'}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={() => {
              draggingRef.current = true;
            }}
            onDragEnd={onDragEnd}
            animate={{ x: width ? -index * width : 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { type: 'spring', stiffness: 70, damping: 20, mass: 0.8 }
            }
          >
            {services.map((service) => (
              <article
                key={service.id}
                className="grid shrink-0 items-stretch gap-8 lg:grid-cols-12"
                style={{ width }}
                aria-hidden={service.id !== active.id}
              >
                <div className="relative lg:col-span-6">
                  <div className="pointer-events-none">
                    <ServiceVisual icon={service.icon} />
                  </div>
                </div>
                <div className="flex flex-col justify-center lg:col-span-6">
                  <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{service.name}</h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">{service.description}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {service.capabilities.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-cyan" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/services"
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan"
                    tabIndex={service.id === active.id ? 0 : -1}
                  >
                    {t('homeServices.explore', { name: service.name })}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute inset-x-6 top-[18px] hidden h-px bg-white/10 lg:block" />
          <div
            className="pointer-events-none absolute top-[18px] hidden h-px bg-cyan/70 lg:block"
            style={{
              left: '1.5rem',
              width: `calc((100% - 3rem) * ${index / (count - 1)})`,
              transition: prefersReduced ? 'none' : 'width 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            aria-hidden="true"
          />
          <div role="tablist" aria-label={t('common.serviceSlides')} className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4 lg:grid-cols-8 lg:bg-transparent lg:gap-0">
            {services.map((service, serviceIndex) => {
              const selected = serviceIndex === index;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => goTo(serviceIndex)}
                  className={cn(
                    'relative bg-navy-dark px-3 py-4 text-left transition-colors lg:bg-transparent lg:px-2 lg:pt-0 lg:pb-2',
                    selected ? 'text-white' : 'text-white/45 hover:text-white/80',
                  )}
                >
                  <span
                    className={cn(
                      'mb-3 hidden h-2.5 w-2.5 rounded-full border lg:block',
                      selected ? 'border-cyan bg-cyan' : 'border-white/30 bg-navy-dark',
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-1 block text-sm font-semibold">{t(`homeServices.rails.${service.id}`)}</span>
                  {selected && (
                    <motion.span
                      layoutId={prefersReduced ? undefined : 'service-underline'}
                      className="absolute inset-x-2 bottom-0 h-px bg-cyan lg:inset-x-0"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
