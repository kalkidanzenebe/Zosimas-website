import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { FinalCta } from '../components/sections/FinalCta';
import { getPostBySlug, posts } from '../data/posts';
import { BlogCard } from '../components/cards/BlogCard';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n } from '../hooks/useI18n';
import { formatDateLabel } from '../lib/utils';

export default function BlogPost() {
  const { slug } = useParams();
  const { locale, t, tx } = useI18n();
  const post = getPostBySlug(slug);

  useDocumentMeta({
    title: post ? t('meta.postTitle', { title: tx(post.title) }) : t('blog.notFoundTitle'),
    description: post ? tx(post.excerpt) : t('blog.notFoundBody'),
  });

  if (!post) {
    return (
      <>
        <PageHero eyebrow={t('blog.eyebrow')} title={t('blog.notFoundTitle')} description={t('blog.notFoundBody')} />
        <section className="bg-page py-16">
          <Container>
            <Button to="/blog" variant="secondary" arrow>
              {t('blog.back')}
            </Button>
          </Container>
        </section>
      </>
    );
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero
        visual="none"
        eyebrow={`${tx(post.category)} · ${tx(post.readTime)}`}
        title={tx(post.title)}
        description={tx(post.excerpt)}
      />
      <section className="bg-page py-16">
        <Container className="max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-teal">
            <ArrowLeft className="h-4 w-4" />
            {t('blog.back')}
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            {t('blog.published')} · {formatDateLabel(post.date, locale)}
          </p>
          <div className="mt-8 overflow-hidden">
            <img src={post.image} alt={tx(post.imageAlt)} className="aspect-[16/8] w-full object-cover" />
          </div>
          <div className="mt-10 space-y-6">
            {post.body.map((block, index) =>
              block.type === 'h2' ? (
                <h2 key={index} className="pt-2 text-2xl font-bold text-ink">
                  {tx(block.text)}
                </h2>
              ) : (
                <p key={index} className="text-base leading-relaxed text-muted">
                  {tx(block.text)}
                </p>
              ),
            )}
          </div>
        </Container>
      </section>
      {related.length > 0 && (
        <section className="bg-surface py-16">
          <Container>
            <h2 className="text-2xl font-bold text-ink">{t('homeBlog.title')}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} compact />
              ))}
            </div>
          </Container>
        </section>
      )}
      <FinalCta />
    </>
  );
}
