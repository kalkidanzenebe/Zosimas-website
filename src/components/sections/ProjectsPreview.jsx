import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectCard } from '../cards/ProjectCard';
import { Button } from '../common/Button';
import { localizedProjects } from '../../i18n/data';
import { useI18n } from '../../hooks/useI18n';

export function ProjectsPreview() {
  const { t, locale } = useI18n();
  const projects = localizedProjects(locale);

  return (
    <section className="overflow-x-hidden bg-page py-16 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-16">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t('homeProjects.eyebrow')}
            title={t('homeProjects.title')}
            description={t('homeProjects.description')}
          />
          <Button to="/projects" variant="secondary" arrow>
            {t('homeProjects.cta')}
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
