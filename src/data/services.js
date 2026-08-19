export const services = [
  {
    id: 'web-development',
    number: '01',
    name: 'Web Development',
    short: 'Modern, resilient web platforms built for performance and clarity.',
    description:
      'We design and develop web applications and digital platforms that help organizations operate, communicate, and grow with confidence.',
    capabilities: [
      'Corporate and product websites',
      'Web applications and portals',
      'Design systems and component libraries',
      'Performance, accessibility, and SEO foundations',
    ],
    businessValue:
      'A web presence that is fast, structured, and ready to support real business workflows — not just a brochure.',
    technologies: ['React', 'Vite', 'Node.js', 'REST APIs', 'Tailwind CSS'],
    icon: 'globe',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Web design and development on a desktop workspace',
  },
  {
    id: 'mobile-development',
    number: '02',
    name: 'Mobile Development',
    short: 'Native-feeling mobile experiences that extend your operations into the field.',
    description:
      'We build mobile applications that bring services, data, and workflows to the people who need them — wherever they work.',
    capabilities: [
      'iOS and Android applications',
      'Cross-platform product development',
      'Offline-aware experiences',
      'App store readiness and iteration support',
    ],
    businessValue:
      'Mobile products that connect customers, teams, and operations without adding unnecessary complexity.',
    technologies: ['React Native', 'Flutter', 'REST APIs', 'Push notifications'],
    icon: 'smartphone',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Mobile app in use on a smartphone',
  },
  {
    id: 'ai-solutions',
    number: '03',
    name: 'AI Solutions',
    short: 'Practical intelligence layered into products, processes, and decision-making.',
    description:
      'We help organizations apply AI where it creates measurable operational value — from intelligent search to workflow assistance.',
    capabilities: [
      'AI-assisted product features',
      'Document and knowledge intelligence',
      'Process automation with human oversight',
      'Model integration and evaluation support',
    ],
    businessValue:
      'Intelligence that supports people and processes, rather than replacing judgment with opaque systems.',
    technologies: ['Python', 'LLM APIs', 'Vector search', 'Node.js'],
    icon: 'brain',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Artificial intelligence and data visualization',
  },
  {
    id: 'custom-software',
    number: '04',
    name: 'Custom Software Development',
    short: 'Purpose-built systems shaped around the way your organization actually works.',
    description:
      'When off-the-shelf tools fall short, we engineer software that fits your operations, data, and growth path.',
    capabilities: [
      'Internal tools and operational systems',
      'API and integration layers',
      'Workflow and case management platforms',
      'Legacy modernization support',
    ],
    businessValue:
      'Software that reduces friction, captures institutional knowledge, and scales with the organization.',
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'REST', 'React'],
    icon: 'code',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Custom software code on a development screen',
  },
  {
    id: 'ui-ux',
    number: '05',
    name: 'UI/UX Design',
    short: 'Interfaces that feel considered, clear, and ready for real use.',
    description:
      'We design digital products with structure, hierarchy, and intent — so people can move through complex systems with ease.',
    capabilities: [
      'Product and experience strategy',
      'Interface design and prototyping',
      'Design systems',
      'Usability-focused iteration',
    ],
    businessValue:
      'Better adoption, fewer support loops, and products that communicate quality from the first interaction.',
    technologies: ['Figma', 'Design systems', 'Accessibility', 'Prototyping'],
    icon: 'pen-tool',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'UI and UX design sketches and interface work',
  },
  {
    id: 'digital-transformation',
    number: '06',
    name: 'Digital Transformation',
    short: 'A structured path from analogue or fragmented processes to connected systems.',
    description:
      'We help organizations rethink how work moves — mapping processes, selecting the right systems, and implementing change with care.',
    capabilities: [
      'Process and systems mapping',
      'Roadmaps and architecture planning',
      'Platform selection and implementation',
      'Change-ready delivery',
    ],
    businessValue:
      'Transformation that is sequenced, practical, and aligned to how the business actually operates.',
    technologies: ['Architecture', 'Cloud', 'APIs', 'Data models'],
    icon: 'network',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Teams collaborating on digital transformation',
  },
  {
    id: 'cloud',
    number: '07',
    name: 'Cloud & Technology Solutions',
    short: 'Reliable infrastructure and architecture for systems that need to last.',
    description:
      'We design cloud and technology foundations that keep products available, maintainable, and ready to grow.',
    capabilities: [
      'Cloud architecture and deployment',
      'Environment and release pipelines',
      'Observability and operational hygiene',
      'Scalable service design',
    ],
    businessValue:
      'Technology that stays dependable as usage, teams, and product scope expand.',
    technologies: ['AWS', 'Docker', 'CI/CD', 'Linux'],
    icon: 'cloud',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Cloud infrastructure and server systems',
  },
  {
    id: 'it-consulting',
    number: '08',
    name: 'IT Consulting',
    short: 'Clear technical guidance before, during, and after a build.',
    description:
      'We advise organizations on technology choices, delivery approaches, and system decisions that affect long-term outcomes.',
    capabilities: [
      'Technology assessments',
      'Architecture and stack advisory',
      'Delivery planning',
      'Vendor and build-vs-buy guidance',
    ],
    businessValue:
      'Decisions made with a full view of cost, complexity, and future flexibility.',
    technologies: ['Architecture', 'Discovery', 'Technical strategy'],
    icon: 'compass',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'IT consulting conversation in a professional setting',
  },
];

export const serviceSelectOptions = services.map((service) => ({
  value: service.id,
  label: service.name,
}));
