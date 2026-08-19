import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { differentiators } from '../../data/company';
import { StaggerContainer, StaggerItem } from '../motion/StaggerContainer';

export function WhyZosimas() {
  return (
    <section className="overflow-x-hidden bg-white py-16 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-16">
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="Why ZOSIMAS"
          title="A digital ecosystem, not a catalogue of extras."
          description="Six ideas sit around one center: technology that is useful, structured, and built to last."
        />
        <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <StaggerItem key={item.id}>
              <article className="h-full border border-line p-6">
                <h3 className="text-lg font-semibold text-navy">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
