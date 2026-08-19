import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Icon } from '../common/Icon';

export function SolutionCard({ solution }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      whileHover={prefersReduced ? undefined : { y: -4 }}
      className="group relative overflow-hidden border border-white/10 bg-navy-dark/40 p-7 transition-colors duration-300 hover:border-cyan/40 hover:bg-navy-mid/40"
    >
      <div className="mb-10 flex items-start justify-between">
        <span className="text-cyan">
          <Icon name={solution.icon} className="h-6 w-6" />
        </span>
        <ArrowUpRight className="h-4 w-4 text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan" />
      </div>
      <h3 className="text-xl font-semibold text-white">{solution.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/65 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
        {solution.description}
      </p>
      <Link to="/solutions" className="mt-6 inline-flex text-sm font-semibold text-cyan">
        View solution
      </Link>
    </motion.article>
  );
}
