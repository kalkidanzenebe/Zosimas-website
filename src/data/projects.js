import bahirDar from '../assets/projects/bahir-dar-citizen-voice.jpg';
import cgmsAdmin from '../assets/projects/cgms-admin-center.jpg';
import hayatHospital from '../assets/projects/hayat-hospital-ai.jpg';
import outOfTheAshe from '../assets/projects/out-of-the-ashe.jpg';

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI' },
  { id: 'enterprise', label: 'Enterprise' },
];

export const projects = [
  {
    id: 'bahir-dar-citizen-voice',
    title: 'Bahir Dar City Administration Compilation System',
    shortTitle: 'Citizen Voice Portal',
    category: 'web',
    categoryLabel: 'Web',
    description:
      'A compilation system for Bahir Dar City Administration that includes the Citizen Voice Portal — a secure, public-facing digital grievance framework for environmental complaints, with asynchronous real-time tracking through automated SMS and email gateways.',
    technologies: ['Citizen portal', 'SMS gateway', 'Email gateway'],
    image: bahirDar,
  },
  {
    id: 'cgms-admin-center',
    title: 'CGMS Admin Center (Citizen Voice Admin)',
    shortTitle: 'CGMS Admin Center',
    category: 'enterprise',
    categoryLabel: 'Enterprise',
    description:
      'An institutional workflow engine that automates complex complaint lifecycles, with microservices-aligned data mutations, secure access tokens, and real-time interactive compliance dashboards built with Recharts.',
    technologies: ['Recharts', 'Microservices', 'Secure access'],
    image: cgmsAdmin,
  },
  {
    id: 'hayat-hospital-ai',
    title: 'AI Customer Service Platform for Hayat Hospital',
    shortTitle: 'Hayat Hospital AI',
    category: 'ai',
    categoryLabel: 'AI',
    description:
      'A multilingual AI-powered customer service platform that provides 24/7 voice and text support for patients, visitors, and hospital staff, using a multi-tenant knowledge base of hospital policies, services, doctors’ schedules, FAQs, and patient guidance.',
    technologies: ['AI', 'Voice & text', 'Knowledge base'],
    image: hayatHospital,
  },
  {
    id: 'out-of-the-ashe',
    title: 'Out of the Ashe (Orphanage Management System)',
    shortTitle: 'Out of the Ashe',
    category: 'enterprise',
    categoryLabel: 'Enterprise',
    description:
      'A production-level enterprise data architecture built to secure, track, and automate complex child welfare data streams, academic evaluations, and multi-tier reporting with robust backend logic.',
    technologies: ['Enterprise data', 'Reporting', 'Backend'],
    image: outOfTheAshe,
  },
];
