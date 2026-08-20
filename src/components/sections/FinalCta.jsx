import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Badge } from '../common/SectionHeading';
import { Reveal } from '../motion/Reveal';
import { useI18n } from '../../hooks/useI18n';

export function FinalCta() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-navy py-14 text-white sm:py-16">
      <Container className="relative text-center">
        <Reveal>
          <Badge light>{t('cta.eyebrow')}</Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            {t('cta.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            {t('cta.body')}
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-6 flex flex-wrap justify-center gap-3">
          <Button to="/contact" variant="light" arrow magnetic>
            {t('nav.startProject')}
          </Button>
          <Button to="/contact" variant="ghost">
            {t('cta.contact')}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
