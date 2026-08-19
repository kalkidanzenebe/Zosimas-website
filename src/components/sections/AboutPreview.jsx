import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '../common/Container';
import { Badge } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { values } from '../../data/company';
import { Reveal } from '../motion/Reveal';

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80';

const previewValues = values.slice(0, 4);

export function AboutPreview() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="flex min-h-[100dvh] flex-col justify-center overflow-x-hidden bg-white py-16 lg:py-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative lg:col-span-5">
            <div className="relative">
              <span className="absolute -left-3 -top-3 hidden h-24 w-24 border border-teal/40 lg:block" aria-hidden="true" />
              <span className="absolute -bottom-3 -right-3 hidden h-28 w-28 border border-navy/15 lg:block" aria-hidden="true" />
              <motion.div
                className="relative overflow-hidden"
                whileHover={prefersReduced ? undefined : { scale: 1.015 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={ABOUT_IMAGE}
                  alt="Contemporary architecture representing structured, long-term digital systems"
                  className="aspect-[4/5] max-h-[min(520px,62vh)] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,58,0.08)_0%,rgba(7,27,58,0.72)_100%)]" />
                <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 400 500" aria-hidden="true">
                  <path d="M40 420 L120 340 L210 370 L300 250 L360 280" fill="none" stroke="#18C7C0" strokeWidth="1.2" />
                  <circle cx="120" cy="340" r="4" fill="#13B8B2" />
                  <circle cx="300" cy="250" r="4" fill="#18C7C0" />
                </svg>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-cyan">WEB • MOBILE • AI</p>
                  <p className="mt-2 text-xl font-semibold text-white">Innovate. Build. Transform.</p>
                </div>
              </motion.div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <Badge>About</Badge>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
                Technology with purpose.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                We treat digital work as infrastructure for the organization: products, platforms, and intelligence that should remain coherent as the business grows.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.08} className="border-l-2 border-teal bg-surface p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">Mission</p>
                <p className="mt-3 text-sm leading-relaxed text-navy">
                  Design and deliver digital systems that help organizations operate with greater clarity, intelligence, and impact.
                </p>
              </Reveal>
              <Reveal delay={0.14} className="border-l-2 border-navy bg-navy p-6 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">Vision</p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  A future where every organization can move forward with technology that is purposeful, scalable, and human-centered.
                </p>
              </Reveal>
            </div>

            <div className="mt-8">
              <Button to="/about" arrow>
                Our story
              </Button>
            </div>
          </div>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <div className="pointer-events-none absolute inset-x-0 top-5 hidden h-px bg-line lg:block" aria-hidden="true" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {previewValues.map((value, index) => (
              <Reveal key={value.id} delay={index * 0.06} className="relative bg-white pt-2 lg:bg-transparent">
                <span className="mb-4 hidden h-2.5 w-2.5 bg-teal lg:block" aria-hidden="true" />
                <p className="font-mono text-[11px] tracking-[0.18em] text-teal">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold text-navy">{value.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
