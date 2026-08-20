import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { DataFlow } from '../common/DataFlow';
import { Reveal } from '../motion/Reveal';
import { Button } from '../common/Button';
import { useI18n } from '../../hooks/useI18n';

export function CompanyIntro() {
  const { t } = useI18n();
  const story = [
    { id: 'connected', label: t('intro.steps.connected') },
    { id: 'idea', label: t('intro.steps.idea') },
    { id: 'design', label: t('intro.steps.design') },
    { id: 'build', label: t('intro.steps.build') },
    { id: 'intelligence', label: t('intro.steps.intelligence') },
    { id: 'transformation', label: t('intro.steps.transformation') },
  ];

  return (
    <section className="overflow-x-hidden bg-page py-16 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow={t('intro.eyebrow')}
              title={t('intro.title')}
              description={t('intro.description')}
            />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p className="text-sm leading-relaxed text-muted">{t('intro.body')}</p>
            <div className="mt-6">
              <Button to="/about" variant="secondary" arrow>
                {t('intro.about')}
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-12 w-full overflow-x-auto">
          <DataFlow steps={story} />
        </Reveal>
      </Container>
    </section>
  );
}
