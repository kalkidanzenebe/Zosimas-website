import { Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { ContactForm } from '../features/contact/ContactForm';
import { company } from '../data/navigation';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Contact() {
  useDocumentMeta({
    title: 'Contact ZOSIMAS | Start a Digital Project',
    description: 'Start a digital project with ZOSIMAS Digital Solution PLC. Share your idea across web, mobile, or AI.',
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you want to build."
        description="Share the challenge, the product idea, or the system that needs to exist. This form is ready for a future backend — it does not send email yet."
      />
      <section className="bg-white py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-2xl font-bold text-navy">Start a conversation.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Whether you need a web platform, a mobile product, an AI-assisted workflow, or a broader digital transformation, we will help you shape the first step.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-navy">
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
              LinkedIn: {company.linkedin}
            </p>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
