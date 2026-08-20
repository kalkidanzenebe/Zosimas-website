import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { buttonHover } from '../../lib/motion';

const variants = {
  primary:
    'bg-navy text-white hover:bg-navy-mid border border-navy dark:bg-white dark:text-navy dark:hover:bg-surface dark:border-white',
  secondary:
    'bg-transparent text-ink border border-ink/20 hover:border-teal hover:text-ink',
  ghost:
    'bg-transparent text-white border border-white/20 hover:border-cyan hover:text-cyan',
  light:
    'bg-white text-navy hover:bg-surface border border-white',
};

export function Button({
  to,
  href,
  children,
  variant = 'primary',
  className,
  arrow = false,
  type = 'button',
  disabled,
  onClick,
  magnetic = false,
}) {
  const prefersReduced = useReducedMotion();
  const classes = cn(
    'group inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-200',
    variants[variant],
    disabled && 'pointer-events-none opacity-60',
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      )}
    </>
  );

  const motionProps = prefersReduced
    ? {}
    : {
        variants: buttonHover,
        initial: 'rest',
        whileHover: 'hover',
        whileTap: 'tap',
      };

  if (to) {
    return (
      <motion.div className="inline-flex" {...motionProps}>
        <Link to={to} className={classes} onClick={onClick}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div className="inline-flex" {...motionProps}>
        <a href={href} className={classes} onClick={onClick}>
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
      whileHover={magnetic && !prefersReduced ? { y: -2, scale: 1.01 } : motionProps.whileHover}
    >
      {content}
    </motion.button>
  );
}
