import { Hero } from '../components/sections/Hero';
import { CompanyIntro } from '../components/sections/CompanyIntro';
import { ServicesPreview } from '../components/sections/ServicesPreview';
import { AboutPreview } from '../components/sections/AboutPreview';
import { SolutionsPreview } from '../components/sections/SolutionsPreview';
import { ProjectsPreview } from '../components/sections/ProjectsPreview';
import { TechnologySection } from '../components/sections/TechnologySection';
import { WhyZosimas } from '../components/sections/WhyZosimas';
import { FinalCta } from '../components/sections/FinalCta';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Home() {
  useDocumentMeta({
    title: 'ZOSIMAS Digital Solution PLC | Web, Mobile & AI Solutions',
    description:
      'ZOSIMAS Digital Solution PLC designs and develops modern digital solutions for organizations across web, mobile, and AI.',
  });

  return (
    <>
      <Hero />
      <CompanyIntro />
      <ServicesPreview />
      <AboutPreview />
      <SolutionsPreview />
      <ProjectsPreview />
      <TechnologySection />
      <WhyZosimas />
      <FinalCta />
    </>
  );
}
