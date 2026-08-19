import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { ProjectShowcase } from '../features/projects/ProjectShowcase';
import { FinalCta } from '../components/sections/FinalCta';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Projects() {
  useDocumentMeta({
    title: 'Projects | ZOSIMAS Digital Solution PLC',
    description: 'Explore ZOSIMAS projects across citizen platforms, enterprise systems, and AI-powered services.',
  });

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected digital work."
        description="Public platforms, enterprise workflows, and AI systems delivered for organizations that need reliable digital infrastructure."
      />
      <section className="bg-white py-20">
        <Container>
          <ProjectShowcase />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
