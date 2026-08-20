import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { FinalCta } from '../components/sections/FinalCta';
import { localizedBenefits, localizedCulture, localizedHiring } from '../i18n/data';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n } from '../hooks/useI18n';

const CAREERS_IMAGE =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80';

export default function Careers() {
  const { t, locale } = useI18n();
  const culturePoints = localizedCulture(locale);
  const careerBenefits = localizedBenefits(locale);
  const hiringAreas = localizedHiring(locale);

  useDocumentMeta({
    title: t('careersPage.metaTitle'),
    description: t('careersPage.metaDescription'),
  });

  return (
    <>
      <PageHero
        dark
        visual="none"
        eyebrow={t('careersPage.eyebrow')}
        title={t('careersPage.title')}
        description={t('careersPage.description')}
      />

      <section className="bg-page py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={t('careersPage.cultureEyebrow')}
              title={t('careersPage.cultureTitle')}
              description={t('careersPage.cultureDescription')}
            />
            <div className="mt-8 space-y-4">
              {culturePoints.map((point) => (
                <article key={point.id} className="border-l-2 border-teal pl-4">
                  <h3 className="font-semibold text-ink">{point.title}</h3>
                  <p className="mt-1 text-sm text-muted">{point.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden">
            <img
              src={CAREERS_IMAGE}
              alt={t('careersPage.imageAlt')}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(7,27,58,0.45)_100%)]" />
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container>
          <SectionHeading eyebrow={t('careersPage.whyEyebrow')} title={t('careersPage.whyTitle')} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {careerBenefits.map((item) => (
              <article key={item.id} className="border border-line bg-card p-6">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-page py-20">
        <Container>
          <SectionHeading
            eyebrow={t('careersPage.joinEyebrow')}
            title={t('careersPage.joinTitle')}
            description={t('careersPage.joinDescription')}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {hiringAreas.map((area) => (
              <article key={area.id} className="border border-line p-6">
                <h3 className="text-lg font-semibold text-ink">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{area.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/contact" arrow>
              {t('careersPage.apply')}
            </Button>
            <p className="text-sm text-muted">{t('careersPage.applyHint')}</p>
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
