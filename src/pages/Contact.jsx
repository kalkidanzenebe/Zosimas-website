import { Mail, MapPin, Phone } from 'lucide-react';
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
                <span>{company.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-teal" aria-hidden="true" />
                <span>{company.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-teal" aria-hidden="true" />
                <span>{company.address}</span>
              </li>
            </ul>
            <p className="mt-8 text-sm text-muted">
              {t('footer.linkedin')}: {company.linkedin}
            </p>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
