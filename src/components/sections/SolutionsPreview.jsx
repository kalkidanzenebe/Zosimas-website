import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { SolutionCard } from '../cards/SolutionCard';
import { DigitalNetwork } from '../common/DigitalNetwork';
import { Button } from '../common/Button';
import { localizedSolutions } from '../../i18n/data';
import { useI18n } from '../../hooks/useI18n';

export function SolutionsPreview() {
  const { t, locale } = useI18n();
  const solutions = localizedSolutions(locale);

  return (
    <section className="relative overflow-x-hidden bg-navy-dark py-16 text-white lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-16 dark:ring-1 dark:ring-inset dark:ring-white/10">
      <div className="pointer-events-none absolute -left-20 bottom-0 w-[420px] opacity-30">
        <DigitalNetwork variant="solutions" />
      </div>
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            light
            eyebrow={t('homeSolutions.eyebrow')}
            title={t('homeSolutions.title')}
            description={t('homeSolutions.description')}
          />
          <Button to="/solutions" variant="ghost" arrow>
            {t('homeSolutions.cta')}
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
