import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { SolutionFlow } from '../components/common/SolutionFlow';
import { SolutionCard } from '../components/cards/SolutionCard';
import { DigitalNetwork } from '../components/common/DigitalNetwork';
import { FinalCta } from '../components/sections/FinalCta';
import { localizedJourney, localizedSolutions } from '../i18n/data';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n } from '../hooks/useI18n';

export default function Solutions() {
  const { t, locale } = useI18n();
  const solutions = localizedSolutions(locale);
  const solutionJourney = localizedJourney(locale);

  useDocumentMeta({
    title: t('solutionsPage.metaTitle'),
    description: t('solutionsPage.metaDescription'),
  });

  return (
    <>
      <PageHero
        dark
        eyebrow={t('solutionsPage.eyebrow')}
        title={t('solutionsPage.title')}
        description={t('solutionsPage.description')}
      />

      <section className="bg-page py-20">
        <Container>
          <SectionHeading
            eyebrow={t('solutionsPage.pathEyebrow')}
            title={t('solutionsPage.pathTitle')}
            description={t('solutionsPage.pathDescription')}
          />
          <div className="mt-12 hidden lg:block">
            <SolutionFlow steps={solutionJourney} />
          </div>
          <div className="mt-10 grid gap-4 lg:hidden">
            {solutionJourney.map((step, index) => (
              <article key={step.id} className="border border-line p-6">
                <p className="text-xs tracking-[0.18em] text-teal">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{step.name}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-dark py-20 text-white dark:ring-1 dark:ring-inset dark:ring-white/10">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[480px] opacity-25">
          <DigitalNetwork variant="solutions" />
        </div>
        <Container className="relative">
          <SectionHeading
            light
            eyebrow={t('solutionsPage.areasEyebrow')}
            title={t('solutionsPage.areasTitle')}
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
            <article key={step.id} className="bg-card p-6">
              <h3 className="text-lg font-semibold text-ink">{step.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            </article>
          ))}
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
