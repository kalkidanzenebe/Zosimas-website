import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectCard } from '../cards/ProjectCard';
import { Button } from '../common/Button';
import { projects } from '../../data/projects';

export function ProjectsPreview() {
  return (
    <section className="overflow-x-hidden bg-white py-16 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-16">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Selected digital work."
            description="A snapshot of platforms in public administration, healthcare, and social services."
          />
          <Button to="/projects" variant="secondary" arrow>
            View all projects
          </Button>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} compact />
          ))}
        </div>
      </Container>
    </section>
  );
}
