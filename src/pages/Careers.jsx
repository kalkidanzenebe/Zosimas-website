import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { FinalCta } from '../components/sections/FinalCta';
import { careerBenefits, culturePoints, hiringAreas } from '../data/careers';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const CAREERS_IMAGE =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80';

export default function Careers() {
  useDocumentMeta({
    title: 'Careers | ZOSIMAS Digital Solution PLC',
    description: 'Work with ZOSIMAS Digital Solution PLC. Join a team building web, mobile, and AI systems with purpose.',
  });

  return (
    <>
      <PageHero
        dark
        visual="none"
        eyebrow="Careers"
        title="Build systems that organizations can depend on."
        description="ZOSIMAS is a place for people who care about craft, structure, and the long life of digital products. If that sounds like you, we want to hear from you."
      />

      <section className="bg-white py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Culture"
              title="Serious work, without theatrics."
              description="We value clear thinking, considered interfaces, and engineering that still makes sense a year later."
            />
            <div className="mt-8 space-y-4">
              {culturePoints.map((point) => (
                <article key={point.id} className="border-l-2 border-teal pl-4">
                  <h3 className="font-semibold text-navy">{point.title}</h3>
                  <p className="mt-1 text-sm text-muted">{point.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden">
            <img
              src={CAREERS_IMAGE}
              alt="People working together on digital products"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(7,27,58,0.45)_100%)]" />
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container>
          <SectionHeading eyebrow="Why work with us" title="Room to grow across the stack." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {careerBenefits.map((item) => (
              <article key={item.id} className="border border-line bg-white p-6">
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <SectionHeading
            eyebrow="Join the team"
            title="We hire people who want to build lasting systems."
            description="Share your background, the kind of work you want to do, and how you think. We review every note that comes in."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {hiringAreas.map((area) => (
              <article key={area.id} className="border border-line p-6">
                <h3 className="text-lg font-semibold text-navy">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{area.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/contact" arrow>
              Apply to join
            </Button>
            <p className="text-sm text-muted">Use the contact form and tell us the role you are interested in.</p>
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
