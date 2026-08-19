export const easePremium = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easePremium },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: easePremium },
  },
};

export const slideIn = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easePremium },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easePremium },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easePremium },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

export const viewportReveal = {
  once: true,
  amount: 0.22,
  margin: '0px 0px -72px 0px',
};

export const reducedFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export function motionSafe(prefersReduced, variants = fadeUp) {
  return prefersReduced ? reducedFade : variants;
}

export const navUnderline = {
  initial: { scaleX: 0, originX: 0 },
  hover: { scaleX: 1, originX: 0, transition: { duration: 0.28, ease: easePremium } },
  active: { scaleX: 1, originX: 0 },
};

export const buttonHover = {
  rest: { y: 0 },
  hover: { y: -1, transition: { duration: 0.2, ease: easePremium } },
  tap: { y: 0, scale: 0.985, transition: { duration: 0.12 } },
};
