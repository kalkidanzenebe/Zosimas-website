import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '../common/Icon';

export function TechnologyCard({ category, index = 0 }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReduced ? undefined : { y: -8 }}
      className="group h-full border border-white/10 bg-navy p-6 shadow-[0_18px_40px_rgba(3,12,28,0.45)] transition-[box-shadow,border-color] duration-300 hover:border-cyan/40 hover:shadow-[0_28px_64px_rgba(3,12,28,0.7)]"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center border border-cyan/30 bg-navy-dark text-cyan shadow-[0_8px_20px_rgba(19,184,178,0.18)]">
        <Icon name={category.icon} className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{category.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {category.items.map((item) => (
          <li
            key={item}
            className="bg-navy-dark px-2.5 py-1 text-xs font-medium text-cyan/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
