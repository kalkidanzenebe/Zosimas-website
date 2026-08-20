import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { ContactForm } from '../features/contact/ContactForm';
import { company } from '../data/navigation';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n } from '../hooks/useI18n';

export default function Contact() {
  const { t } = useI18n();

  useDocumentMeta({
    title: t('contactPage.metaTitle'),
    description: t('contactPage.metaDescription'),
  });

  return (
    <>
      <PageHero
        eyebrow={t('contactPage.eyebrow')}
        title={t('contactPage.title')}
        description={t('contactPage.description')}
      />
      <section className="bg-page py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-2xl font-bold text-ink">{t('contactPage.heading')}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t('contactPage.body')}</p>
            <ul className="mt-8 space-y-4 text-sm text-ink">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-teal" aria-hidden="true" />
                <a href={`mailto:${company.email}`} className="hover:text-teal">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-teal" aria-hidden="true" />
                <a href={`tel:${company.phone}`} className="hover:text-teal">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-teal" aria-hidden="true" />
                <span>{company.address}</span>
              </li>
            </ul>
            <div className="mt-8">
              {company.linkedin ? (
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-teal hover:text-teal"
                  aria-label={t('footer.linkedin')}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              ) : (
                <span
                  className="inline-flex h-11 w-11 items-center justify-center border border-line text-muted"
                  aria-label={t('footer.linkedin')}
                  title={t('footer.linkedin')}
                >
                  <Linkedin className="h-5 w-5" />
                </span>
              )}
            </div>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
