import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { GeometricPattern } from '../components/common/GeometricPattern';
import { DataFlow } from '../components/common/DataFlow';
import { Button } from '../components/common/Button';
import { FinalCta } from '../components/sections/FinalCta';
import { Reveal } from '../components/motion/Reveal';
import { localizedPrinciples, localizedValues } from '../i18n/data';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n } from '../hooks/useI18n';

const STORY_IMAGE =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80';

export default function About() {
  const { t, locale } = useI18n();
  const values = localizedValues(locale);
  const workPrinciples = localizedPrinciples(locale);

  useDocumentMeta({
    title: t('aboutPage.metaTitle'),
    description: t('aboutPage.metaDescription'),
  });

  return (
    <>
      <PageHero
        dark
        eyebrow={t('aboutPage.eyebrow')}
        title={t('aboutPage.title')}
        description={t('aboutPage.description')}
      />

      <section className="bg-page py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={t('aboutPage.storyEyebrow')}
              title={t('aboutPage.storyTitle')}
              description={t('aboutPage.storyDescription')}
            />
            <Reveal className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              <p>{t('aboutPage.storyP1')}</p>
              <p>{t('aboutPage.storyP2')}</p>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative">
              <span className="absolute -right-3 -top-3 hidden h-20 w-20 border border-teal/40 lg:block" aria-hidden="true" />
              <span className="absolute -bottom-3 -left-3 hidden h-24 w-24 border border-ink/10 lg:block" aria-hidden="true" />
              <div className="relative overflow-hidden">
                <img
                  src={STORY_IMAGE}
                  alt={t('aboutPage.storyImageAlt')}
                  className="aspect-[4/5] max-h-[min(560px,70vh)] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,40,85,0.05)_20%,rgba(7,27,58,0.55)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-cyan">{t('aboutPage.storyCaption')}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{t('aboutPage.storyTitle')}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <article className="border border-line bg-card p-8">
            <SectionHeading eyebrow={t('aboutPage.missionEyebrow')} title={t('aboutPage.missionTitle')} />
            <p className="mt-4 text-sm leading-relaxed text-muted">{t('aboutPage.missionBody')}</p>
          </article>
          <article className="border border-line bg-card p-8">
            <SectionHeading eyebrow={t('aboutPage.visionEyebrow')} title={t('aboutPage.visionTitle')} />
            <p className="mt-4 text-sm leading-relaxed text-muted">{t('aboutPage.visionBody')}</p>
          </article>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-page py-20">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 opacity-40 lg:block">
          <GeometricPattern className="text-ink" />
        </div>
        <Container>
          <SectionHeading eyebrow={t('aboutPage.valuesEyebrow')} title={t('aboutPage.valuesTitle')} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article key={value.id} className="border border-line p-6">
                <h3 className="text-lg font-semibold text-ink">{value.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-dark py-20 text-white">
        <Container>
          <SectionHeading
            light
            eyebrow={t('aboutPage.workEyebrow')}
            title={t('aboutPage.workTitle')}
            description={t('aboutPage.workDescription')}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {workPrinciples.map((step, index) => (
              <article key={step.id} className="border border-white/10 p-6">
                <p className="text-xs tracking-[0.18em] text-cyan">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold">{step.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-page py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={t('aboutPage.philosophyEyebrow')}
              title={t('aboutPage.philosophyTitle')}
              description={t('aboutPage.philosophyDescription')}
            />
            <div className="mt-8">
              <Button to="/services" arrow>
                {t('aboutPage.seeServices')}
              </Button>
            </div>
          </div>
          <Reveal>
            <DataFlow
              steps={[
                { id: 'people', label: t('aboutPage.flow.people') },
                { id: 'process', label: t('aboutPage.flow.process') },
                { id: 'product', label: t('aboutPage.flow.product') },
                { id: 'intelligence', label: t('aboutPage.flow.intelligence') },
              ]}
            />
          </Reveal>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
