import { Moon, Sun } from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';
import { cn } from '../../lib/utils';

export function ThemeToggle({ inverted = false, className }) {
  const { theme, toggleTheme, t } = useI18n();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center border transition-colors',
        inverted
          ? 'border-white/20 text-white hover:border-cyan hover:text-cyan'
          : 'border-line text-ink hover:border-teal',
        className,
      )}
      aria-label={dark ? t('theme.toLight') : t('theme.toDark')}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

const LANGUAGE_OPTIONS = [
  { id: 'en', label: 'EN', lang: 'en', name: 'English' },
  { id: 'am', label: 'አማ', lang: 'am', name: 'Amharic' },
];

export function LanguageToggle({ inverted = false, className }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={cn(
        'inline-flex h-10 border',
        inverted ? 'border-white/20' : 'border-line',
        className,
      )}
    >
      {LANGUAGE_OPTIONS.map((option) => {
        const active = locale === option.id;
        return (
          <button
            key={option.id}
            type="button"
            lang={option.lang}
            title={option.name}
            onClick={() => setLocale(option.id)}
            className={cn(
              'min-w-10 whitespace-nowrap px-2.5 text-xs font-semibold tracking-wide transition-colors',
              inverted
                ? active
                  ? 'bg-white text-navy'
                  : 'text-white/70 hover:text-white'
                : active
                  ? 'bg-navy text-white dark:bg-white dark:text-navy'
                  : 'text-ink/70 hover:text-ink',
            )}
            aria-label={option.name}
            aria-pressed={active}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function SiteControls({ inverted = false, className }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <LanguageToggle inverted={inverted} />
      <ThemeToggle inverted={inverted} />
    </div>
  );
}
