import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { TechnologyCard } from '../cards/TechnologyCard';
import { technologies } from '../../data/technologies';

export function TechnologySection() {
  return (
    <section className="relative overflow-hidden bg-navy-dark py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(19,184,178,0.12),transparent_34%),radial-gradient(circle_at_90%_80%,rgba(11,40,85,0.9),transparent_40%)]" />
      <Container className="relative">
        <SectionHeading
          light
          eyebrow="Technology"
          title="A modern stack, applied with restraint."
          description="We choose tools that keep products maintainable. The stack is a means — architecture and judgment are the work."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {technologies.map((category, index) => (
            <TechnologyCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
