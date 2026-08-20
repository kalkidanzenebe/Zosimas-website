import { Link } from 'react-router-dom';
import { company } from '../../data/navigation';
import { Logo } from '../common/Logo';
import { Container } from '../common/Container';
import { AnimatedLine } from '../motion/AnimatedLine';
import { localizedFooterNav, localizedLegal, localizedServices } from '../../i18n/data';
import { useI18n } from '../../hooks/useI18n';

export function Footer() {
  const year = new Date().getFullYear();
  const { t, locale } = useI18n();
  const footerNav = localizedFooterNav(t);
  const legalLinks = localizedLegal(t);
  const services = localizedServices(locale);

  return (
    <footer className="relative overflow-hidden bg-navy-dark text-white">
      <svg className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full opacity-40" viewBox="0 0 1200 120" aria-hidden="true">
        <path d="M0 70 L180 40 L360 80 L540 30 L720 74 L900 28 L1080 66 L1200 44" fill="none" stroke="#13B8B2" strokeWidth="1" />
        <circle cx="180" cy="40" r="3" fill="#18C7C0" />
        <circle cx="540" cy="30" r="3" fill="#18C7C0" />
        <circle cx="900" cy="28" r="3" fill="#18C7C0" />
      </svg>
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light to="/" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {t('footer.blurb', { name: company.name, tagline: t('brand.tagline') })}
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan">{company.brandLine}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-sm font-semibold text-white">{t('footer.navigate')}</h2>
              <ul className="mt-4 space-y-2">
                {footerNav.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm text-white/65 transition-colors hover:text-cyan">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">{t('footer.services')}</h2>
              <ul className="mt-4 space-y-2">
                {services.slice(0, 6).map((service) => (
                  <li key={service.id}>
                    <Link to="/services" className="text-sm text-white/65 transition-colors hover:text-cyan">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">{t('footer.contact')}</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                <li>{company.email}</li>
                <li>{company.phone}</li>
                <li>{company.address}</li>
                <li>
                  <span className="text-white/45">{t('footer.linkedin')} · </span>
                  {company.linkedin}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <AnimatedLine dark className="mt-12 w-full bg-white/10" />
        <div className="mt-6 flex flex-col gap-3 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.rights', { year, name: company.name })}</p>
          <div className="flex gap-5">
            {legalLinks.map((item) => (
              <Link key={item.label} to={item.to} className="hover:text-cyan">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
