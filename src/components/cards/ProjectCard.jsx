import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ProjectCard({ project, className, compact = false }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      layout={!compact}
      whileHover={prefersReduced ? undefined : { y: compact ? -3 : -6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn('group overflow-hidden border border-line bg-white', className)}
    >
      <Link to="/projects" className="block">
        <div className="relative overflow-hidden bg-navy-dark">
          <div className={cn('overflow-hidden', compact ? 'aspect-[16/9]' : 'aspect-[16/10]')}>
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-navy-dark/0 transition-colors duration-300 group-hover:bg-navy-dark/18" />
        </div>
        <div className={cn(compact ? 'p-4' : 'p-6')}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">{project.categoryLabel}</p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className={cn('font-semibold text-navy', compact ? 'text-base leading-snug' : 'text-xl')}>
              {compact ? project.shortTitle || project.title : project.title}
            </h3>
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          {!compact && (
            <>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="border border-line px-2 py-1 text-[11px] font-medium text-navy">
                    {tech}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
