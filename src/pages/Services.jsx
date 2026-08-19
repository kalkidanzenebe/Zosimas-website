import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { FinalCta } from '../components/sections/FinalCta';
import { services } from '../data/services';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { cn } from '../lib/utils';

export default function Services() {
  useDocumentMeta({
    title: 'Digital Services | Web, Mobile, AI & Software',
    description: 'Explore ZOSIMAS services across web development, mobile, AI, custom software, design, cloud, and IT consulting.',
  });

  return (
    <>
      <PageHero
        visual="none"
        eyebrow="Services"
        title="A connected practice across web, mobile, and AI."
        description="Each service is designed as part of the same system: interfaces, platforms, intelligence, and the architecture that holds them together."
      />
      {services.map((service, index) => {
        const reversed = index % 2 === 1;
        return (
          <section key={service.id} id={service.id} className={cn('py-20', index % 2 === 0 ? 'bg-white' : 'bg-surface')}>
            <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={reversed ? 'lg:order-2' : ''}>
                <h2 className="text-3xl font-bold text-navy">{service.name}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">{service.description}</p>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold text-navy">Capabilities</h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      {service.capabilities.map((item) => (
                        <li key={item}>— {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy">Business value</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{service.businessValue}</p>
                    <h3 className="mt-6 text-sm font-semibold text-navy">Technologies</h3>
                    <p className="mt-3 text-sm text-muted">{service.technologies.join(' · ')}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button to="/contact" arrow>
                    Discuss this service
                  </Button>
                </div>
              </div>

              <div className={cn('relative w-full', reversed ? 'lg:order-1' : '')}>
                <span
                  className={cn(
                    'absolute inset-4 bg-navy shadow-[0_30px_70px_rgba(7,27,58,0.35)]',
                    reversed ? '-translate-x-3 translate-y-3' : 'translate-x-3 translate-y-3',
                  )}
                  aria-hidden="true"
                />
                <div className="group relative h-[70dvh] overflow-hidden lg:h-[80dvh]">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,58,0.08)_0%,rgba(7,27,58,0.45)_100%)]" />
                  <span className="absolute left-5 top-5 h-10 w-10 border-l-2 border-t-2 border-cyan" aria-hidden="true" />
                  <span className="absolute bottom-5 right-5 h-10 w-10 border-b-2 border-r-2 border-cyan" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xl font-semibold text-white">{service.name}</p>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}
      <FinalCta />
    </>
  );
}
