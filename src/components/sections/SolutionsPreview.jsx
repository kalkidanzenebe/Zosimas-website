import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { SolutionCard } from '../cards/SolutionCard';
import { DigitalNetwork } from '../common/DigitalNetwork';
import { solutions } from '../../data/company';
import { Button } from '../common/Button';

export function SolutionsPreview() {
  return (
    <section className="relative overflow-x-hidden bg-navy-dark py-16 text-white lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-16">
      <div className="pointer-events-none absolute -left-20 bottom-0 w-[420px] opacity-30">
        <DigitalNetwork variant="solutions" />
      </div>
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            light
            eyebrow="Solutions"
            title="Where business pressure meets a digital response."
            description="We shape systems around the actual challenge: automation, intelligence, platforms, and experience — connected rather than isolated."
          />
          <Button to="/solutions" variant="ghost" arrow>
            Explore solutions
          </Button>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>
      </Container>
    </section>
  );
}
