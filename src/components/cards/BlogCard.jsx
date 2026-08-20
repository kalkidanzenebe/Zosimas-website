import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';
import { formatDateLabel } from '../../lib/utils';
import { cn } from '../../lib/utils';

export function RemoteImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={cn(
          'bg-[linear-gradient(135deg,#0b2855_0%,#13b8b2_100%)] dark:bg-[linear-gradient(135deg,#1a222e_0%,#13b8b2_100%)]',
          className,
        )}
        aria-hidden={!alt}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

export function BlogCard({ post, compact = false }) {
  const { locale, t, tx } = useI18n();
  const title = tx(post.title);
  const excerpt = tx(post.excerpt);
  const category = tx(post.category);
  const readTime = tx(post.readTime);

  return (
    <article className="group overflow-hidden border border-line bg-card">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden bg-surface">
          <RemoteImage
            src={post.image}
            alt={tx(post.imageAlt)}
            className={cn(
              'w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]',
              compact ? 'aspect-[16/9] min-h-[180px]' : 'aspect-[16/10] min-h-[240px]',
            )}
          />
        </div>
        <div className={compact ? 'p-4' : 'p-6'}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">
            {category} · {formatDateLabel(post.date, locale)}
          </p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className={cn('font-semibold text-ink', compact ? 'text-base leading-snug' : 'text-xl')}>{title}</h3>
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ink transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          {!compact && <p className="mt-3 text-sm leading-relaxed text-muted">{excerpt}</p>}
          <p className="mt-4 text-sm font-semibold text-ink">{t('blog.read')}</p>
          <p className="mt-1 text-xs text-muted">{readTime}</p>
        </div>
      </Link>
    </article>
  );
}
