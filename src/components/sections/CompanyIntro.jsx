import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { DataFlow } from '../common/DataFlow';
import { Reveal } from '../motion/Reveal';
import { Button } from '../common/Button';

const story = [
  { id: 'connected', label: 'Connected' },
  { id: 'idea', label: 'Idea' },
  { id: 'design', label: 'Design' },
  { id: 'build', label: 'Build' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'transformation', label: 'Transformation' },
];

export function CompanyIntro() {
  return (
    <section className="overflow-x-hidden bg-white py-16 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Introduction"
              title="A connected way to design, build, and transform."
              description="ZOSIMAS exists to help organizations move from fragmented tools and analogue processes to digital systems that are coherent, intelligent, and ready for use."
            />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p className="text-sm leading-relaxed text-muted">
              We work across web, mobile, and AI with a single visual and engineering language: networks, structure, and motion with purpose. The result is technology that feels considered — and remains useful after launch.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="secondary" arrow>
                About ZOSIMAS
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-12 w-full overflow-x-auto">
          <DataFlow steps={story} />
        </Reveal>
      </Container>
    </section>
  );
}
