import { services } from '../data/services';
import { solutions, differentiators, values, workPrinciples, solutionJourney } from '../data/company';
import { technologies } from '../data/technologies';
import { projectCategories, projects } from '../data/projects';
import { careerBenefits, culturePoints, hiringAreas } from '../data/careers';
import { navItems as baseNav, footerNav as baseFooter, legalLinks as baseLegal } from '../data/navigation';
import { localizeItem } from './t';
import {
  benefitAm,
  cultureAm,
  differentiatorAm,
  hiringAm,
  journeyAm,
  principleAm,
  projectAm,
  projectCategoryAm,
  serviceAm,
  solutionAm,
  technologyAm,
  valueAm,
} from './content';

export function localizedNav(t) {
  return [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/services', label: t('nav.services') },
    { to: '/solutions', label: t('nav.solutions') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/careers', label: t('nav.careers') },
    { to: '/contact', label: t('nav.contact') },
  ];
}

export function localizedFooterNav(t) {
  return localizedNav(t);
}

export function localizedLegal(t) {
  return [
    { label: t('footer.privacy'), to: '/contact' },
    { label: t('footer.terms'), to: '/contact' },
  ];
}

export function localizedServices(locale) {
  return services.map((item) => localizeItem(item, serviceAm[item.id], locale));
}

export function localizedServiceOptions(locale) {
  return localizedServices(locale).map((service) => ({
    value: service.id,
    label: service.name,
  }));
}

export function localizedSolutions(locale) {
  return solutions.map((item) => localizeItem(item, solutionAm[item.id], locale));
}

export function localizedDifferentiators(locale) {
  return differentiators.map((item) => localizeItem(item, differentiatorAm[item.id], locale));
}

export function localizedValues(locale) {
  return values.map((item) => localizeItem(item, valueAm[item.id], locale));
}

export function localizedPrinciples(locale) {
  return workPrinciples.map((item) => localizeItem(item, principleAm[item.id], locale));
}

export function localizedJourney(locale) {
  return solutionJourney.map((item) => localizeItem(item, journeyAm[item.id], locale));
}

export function localizedTechnologies(locale) {
  return technologies.map((item) => localizeItem(item, technologyAm[item.id], locale));
}

export function localizedProjects(locale) {
  return projects.map((item) => localizeItem(item, projectAm[item.id], locale));
}

export function localizedProjectCategories(locale) {
  return projectCategories.map((item) => ({
    ...item,
    label: locale === 'am' ? projectCategoryAm[item.id] || item.label : item.label,
  }));
}

export function localizedCulture(locale) {
  return culturePoints.map((item) => localizeItem(item, cultureAm[item.id], locale));
}

export function localizedBenefits(locale) {
  return careerBenefits.map((item) => localizeItem(item, benefitAm[item.id], locale));
}

export function localizedHiring(locale) {
  return hiringAreas.map((item) => localizeItem(item, hiringAm[item.id], locale));
}

export { baseNav, baseFooter, baseLegal };
