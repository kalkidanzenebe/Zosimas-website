import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Badge } from '../common/SectionHeading';
import { Reveal } from '../motion/Reveal';

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-14 text-white sm:py-16">
      <Container className="relative text-center">
        <Reveal>
          <Badge light>Next step</Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Have an idea? Let’s build it.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            Tell us about the system you need — a product, a platform, or a more intelligent way of working.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-6 flex flex-wrap justify-center gap-3">
          <Button to="/contact" variant="light" arrow magnetic>
            Start a Project
          </Button>
          <Button to="/contact" variant="ghost">
            Contact Us
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
