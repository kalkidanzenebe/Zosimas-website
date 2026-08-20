import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { TechnologyCard } from '../cards/TechnologyCard';
import { localizedTechnologies } from '../../i18n/data';
import { useI18n } from '../../hooks/useI18n';

export function TechnologySection() {
  const { t, locale } = useI18n();
  const technologies = localizedTechnologies(locale);

  return (
    <section className="relative overflow-hidden bg-navy-dark py-20 lg:py-24 dark:ring-1 dark:ring-inset dark:ring-white/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(19,184,178,0.12),transparent_34%),radial-gradient(circle_at_90%_80%,rgba(11,40,85,0.9),transparent_40%)]" />
      <Container className="relative">
        <SectionHeading
          light
          eyebrow={t('homeTech.eyebrow')}
          title={t('homeTech.title')}
          description={t('homeTech.description')}
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
