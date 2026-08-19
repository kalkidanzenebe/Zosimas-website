import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { SolutionFlow } from '../components/common/SolutionFlow';
import { SolutionCard } from '../components/cards/SolutionCard';
import { DigitalNetwork } from '../components/common/DigitalNetwork';
import { FinalCta } from '../components/sections/FinalCta';
import { solutions, solutionJourney } from '../data/company';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Solutions() {
  useDocumentMeta({
    title: 'Digital Solutions | ZOSIMAS Digital Solution PLC',
    description: 'Business-focused digital solutions from ZOSIMAS: automation, AI, platforms, enterprise software, experience, and data-driven systems.',
  });

  return (
    <>
      <PageHero
        dark
        eyebrow="Solutions"
        title="From a business challenge to a system that holds."
        description="We start with the pressure inside the organization, then design the solution, technology, and operating value as one connected path."
      />

      <section className="bg-white py-20">
        <Container>
          <SectionHeading
            eyebrow="The path"
            title="Challenge. Solution. Technology. Value."
            description="This sequence is the backbone of how we approach digital work. It is also the visual language of the page: a flow, not a pile of features."
          />
          <div className="mt-12 hidden lg:block">
            <SolutionFlow steps={solutionJourney} />
          </div>
          <div className="mt-10 grid gap-4 lg:hidden">
            {solutionJourney.map((step, index) => (
              <article key={step.id} className="border border-line p-6">
                <p className="text-xs tracking-[0.18em] text-teal">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-navy">{step.name}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-dark py-20 text-white">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[480px] opacity-25">
          <DigitalNetwork variant="solutions" />
        </div>
        <Container className="relative">
          <SectionHeading
            light
            eyebrow="Solution areas"
            title="Six ways the same idea takes form."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container className="grid gap-8 lg:grid-cols-4">
          {solutionJourney.map((step) => (
            <article key={step.id} className="bg-white p-6">
              <h3 className="text-lg font-semibold text-navy">{step.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            </article>
          ))}
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
