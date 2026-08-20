import { Hero } from '../components/sections/Hero';
import { CompanyIntro } from '../components/sections/CompanyIntro';
import { ServicesPreview } from '../components/sections/ServicesPreview';
import { AboutPreview } from '../components/sections/AboutPreview';
import { SolutionsPreview } from '../components/sections/SolutionsPreview';
import { ProjectsPreview } from '../components/sections/ProjectsPreview';
import { BlogPreview } from '../components/sections/BlogPreview';
import { TechnologySection } from '../components/sections/TechnologySection';
import { WhyZosimas } from '../components/sections/WhyZosimas';
import { FinalCta } from '../components/sections/FinalCta';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n } from '../hooks/useI18n';

export default function Home() {
  const { t } = useI18n();
  useDocumentMeta({
    title: t('meta.homeTitle'),
    description: t('meta.homeDescription'),
  });

  return (
    <>
      <Hero />
      <CompanyIntro />
      <ServicesPreview />
      <AboutPreview />
      <SolutionsPreview />
      <ProjectsPreview />
      <BlogPreview />
      <TechnologySection />
      <WhyZosimas />
      <FinalCta />
    </>
  );
}
