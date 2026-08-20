import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import logoSrc from '../../assets/logo/logo.png';
import { useI18n } from '../../hooks/useI18n';

export function LogoMark({ className }) {
  return (
    <span className={cn('relative isolate block h-10 w-10 overflow-hidden rounded-sm bg-white', className)}>
      <img
        src={logoSrc}
        alt=""
        className="absolute inset-[-18%_0_auto] h-[165%] w-full object-cover object-top"
      />
    </span>
  );
}

export function Logo({ to = '/', compact = false, className, onClick, light = false }) {
  const { t } = useI18n();
  const word = light ? 'text-white' : 'text-ink';
  const sub = light ? 'text-cyan/80' : 'text-muted';

  const content = (
    <>
      <LogoMark />
      <span className="flex min-w-0 flex-col leading-none">
        <span className={cn('text-[15px] font-extrabold tracking-[0.18em]', word)}>ZOSIMAS</span>
        {!compact && (
          <span className={cn('mt-1 text-[9px] font-medium uppercase tracking-[0.22em]', sub)}>
            {t('logo.digital')}
          </span>
        )}
      </span>
    </>
  );

  const classes = cn('inline-flex items-center gap-3', className);

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={t('logo.home')} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
