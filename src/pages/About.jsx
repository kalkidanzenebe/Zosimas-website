import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { GeometricPattern } from '../components/common/GeometricPattern';
import { DataFlow } from '../components/common/DataFlow';
import { Button } from '../components/common/Button';
import { FinalCta } from '../components/sections/FinalCta';
import { Reveal } from '../components/motion/Reveal';
import { values, workPrinciples } from '../data/company';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const STORY_IMAGE =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80';

export default function About() {
  useDocumentMeta({
    title: 'About ZOSIMAS | Digital Solutions & Technology',
    description: 'Learn how ZOSIMAS Digital Solution PLC approaches digital solutions, technology, and long-term product craft.',
  });

  return (
    <>
      <PageHero
        dark
        eyebrow="About ZOSIMAS"
        title="A technology company built around connection."
        description="ZOSIMAS Digital Solution PLC designs and develops modern digital solutions across web, mobile, and AI. We help organizations innovate, build, and transform with purpose."
      />

      <section className="bg-white py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Company story"
              title="From idea to a connected system."
              description="Organizations rarely need more software for its own sake. They need a clearer way of working — products, platforms, and intelligence that hold together."
            />
            <Reveal className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              <p>
                ZOSIMAS was formed around a simple conviction: digital work should feel like an extension of the business, not a separate layer of noise. That is why our visual language, engineering practice, and delivery model all start from connection.
              </p>
              <p>
                We do not invent a catalogue of awards, clients, or scale. We focus on the craft of building systems that remain readable, maintainable, and useful.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative">
              <span className="absolute -right-3 -top-3 hidden h-20 w-20 border border-teal/40 lg:block" aria-hidden="true" />
              <span className="absolute -bottom-3 -left-3 hidden h-24 w-24 border border-navy/10 lg:block" aria-hidden="true" />
              <div className="relative overflow-hidden">
                <img
                  src={STORY_IMAGE}
                  alt="A bright, modern workspace representing connected digital work"
                  className="aspect-[4/5] max-h-[min(560px,70vh)] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,40,85,0.05)_20%,rgba(7,27,58,0.55)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-cyan">COMPANY STORY</p>
                  <p className="mt-1 text-lg font-semibold text-white">From idea to a connected system.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <article className="border border-line bg-white p-8">
            <SectionHeading eyebrow="Mission" title="Technology with purpose." />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              To design and deliver digital systems that help organizations operate with greater clarity, intelligence, and impact.
            </p>
          </article>
          <article className="border border-line bg-white p-8">
            <SectionHeading eyebrow="Vision" title="Digital progress that lasts." />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A future where every organization can move forward with technology that is purposeful, scalable, and human-centered.
            </p>
          </article>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 opacity-40 lg:block">
          <GeometricPattern className="text-navy" />
        </div>
        <Container>
          <SectionHeading eyebrow="Values" title="How we choose to work." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article key={value.id} className="border border-line p-6">
                <h3 className="text-lg font-semibold text-navy">{value.name}</h3>
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
            eyebrow="How we work"
            title="A calm, sequential delivery path."
            description="Discovery, design, build, and refinement — each stage leaves a clearer system behind it."
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

      <section className="bg-white py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Technology philosophy"
              title="Intelligence should remain accountable."
              description="We apply modern engineering and AI where they create operational value — with architecture, oversight, and a bias toward systems that people can still understand."
            />
            <div className="mt-8">
              <Button to="/services" arrow>
                See our services
              </Button>
            </div>
          </div>
          <Reveal>
            <DataFlow
              steps={[
                { id: 'people', label: 'People' },
                { id: 'process', label: 'Process' },
                { id: 'product', label: 'Product' },
                { id: 'intelligence', label: 'Intelligence' },
              ]}
            />
          </Reveal>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
