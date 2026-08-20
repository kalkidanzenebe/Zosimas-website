import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { localizedDifferentiators } from '../../i18n/data';
import { StaggerContainer, StaggerItem } from '../motion/StaggerContainer';
import { useI18n } from '../../hooks/useI18n';

export function WhyZosimas() {
  const { t, locale } = useI18n();
  const differentiators = localizedDifferentiators(locale);

  return (
    <section className="overflow-x-hidden bg-page py-16 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-16">
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow={t('homeWhy.eyebrow')}
          title={t('homeWhy.title')}
          description={t('homeWhy.description')}
        />
        <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <StaggerItem key={item.id}>
              <article className="h-full border border-line p-6">
                <h3 className="text-lg font-semibold text-ink">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
