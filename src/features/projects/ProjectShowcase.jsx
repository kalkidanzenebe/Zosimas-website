import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projectCategories, projects } from '../../data/projects';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { cn } from '../../lib/utils';

export function ProjectShowcase({ heading = false }) {
  const [active, setActive] = useState('all');
  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((project) => project.category === active)),
    [active],
  );

  return (
    <div>
      {heading}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
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
                ? 'border-navy bg-navy text-white'
                : 'border-line bg-white text-navy hover:border-teal',
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <p className="text-muted">No projects in this category yet.</p>
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
