import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { DigitalNetwork } from '../common/DigitalNetwork';
import { Badge } from '../common/SectionHeading';
import { fadeUp, motionSafe, staggerContainer } from '../../lib/motion';
import { company } from '../../data/navigation';

export function Hero() {
  const prefersReduced = useReducedMotion();
  const variants = motionSafe(prefersReduced, fadeUp);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy-dark pt-24 pb-12 text-white lg:pt-28 lg:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(19,184,178,0.16),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(24,199,192,0.12),transparent_28%)]" />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6 xl:gap-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={variants}>
            <Badge light>Digital Solutions • Web • Mobile • AI</Badge>
          </motion.div>
          <motion.h1
            variants={variants}
            className="mt-5 max-w-xl text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-[52px] lg:leading-[1.08]"
          >
            We build digital systems that move businesses forward.
          </motion.h1>
          <motion.p variants={variants} className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            {company.name} designs and develops modern digital solutions for organizations — from web and mobile products to applied AI and connected platforms.
          </motion.p>
          <motion.p variants={variants} className="mt-4 text-sm font-semibold tracking-[0.18em] text-cyan uppercase">
            {company.tagline}
          </motion.p>
          <motion.div variants={variants} className="mt-8 flex flex-wrap gap-3">
            <Button to="/contact" variant="light" arrow magnetic>
              Start a Project
            </Button>
            <Button to="/services" variant="ghost" arrow>
              Explore Services
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex w-full max-w-[min(92%,460px)] items-center justify-center sm:max-w-[520px] lg:max-w-none lg:self-stretch"
        >
          <DigitalNetwork
            variant="hero"
            showZ
            className="mx-auto w-full max-h-[min(62vh,560px)] lg:max-h-[min(82vh,760px)]"
          />
        </motion.div>
      </Container>
    </section>
  );
}
