import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { localizedProjectCategories, localizedProjects } from '../../i18n/data';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { cn } from '../../lib/utils';
import { useI18n } from '../../hooks/useI18n';

export function ProjectShowcase({ heading = false }) {
  const { t, locale } = useI18n();
  const [active, setActive] = useState('all');
  const projects = localizedProjects(locale);
  const projectCategories = localizedProjectCategories(locale);
  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((project) => project.category === active)),
    [active, projects],
  );

  return (
    <div>
      {heading}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('common.projectCategories')}>
        {projectCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={active === category.id}
            onClick={() => setActive(category.id)}
            className={cn(
              'border px-4 py-2 text-sm font-medium transition-colors',
              active === category.id
                ? 'border-navy bg-navy text-white dark:border-white dark:bg-white dark:text-navy'
                : 'border-line bg-card text-ink hover:border-teal',
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <p className="text-muted">{t('common.noProjects')}</p>
          ) : (
            filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.28 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
