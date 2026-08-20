import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Icon } from '../common/Icon';
import { useI18n } from '../../hooks/useI18n';

export function ServiceCard({ service, index = 0 }) {
  const prefersReduced = useReducedMotion();
  const { t } = useI18n();

  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReduced ? undefined : { y: -4 }}
      className="group relative overflow-hidden border border-line bg-card p-6 transition-colors duration-300 hover:border-teal/50 hover:bg-surface dark:hover:bg-navy-dark"
    >
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-teal transition-transform duration-300 group-hover:scale-x-100" />
      <div className="mb-8 flex items-start justify-between">
        <span className="text-xs font-semibold tracking-[0.18em] text-muted">{service.number}</span>
        <motion.span
          className="text-ink"
          whileHover={prefersReduced ? undefined : { x: 2, y: -2 }}
        >
          <Icon name={service.icon} className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.span>
      </div>
      <h3 className="text-lg font-semibold text-ink">{service.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{service.short}</p>
      <Link
        to="/services"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
      >
        {t('common.explore')}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.article>
  );
}
