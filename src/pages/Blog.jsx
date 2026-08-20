import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { BlogCard } from '../components/cards/BlogCard';
import { FinalCta } from '../components/sections/FinalCta';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n } from '../hooks/useI18n';
import { usePublishedPosts } from '../hooks/usePosts';

export default function Blog() {
  const { t, tx } = useI18n();
  const { posts, loading } = usePublishedPosts();
  const featured = posts[0];

  useDocumentMeta({
    title: t('blog.metaTitle'),
    description: t('blog.metaDescription'),
  });

  return (
    <>
      <PageHero
        eyebrow={t('blog.eyebrow')}
        title={t('blog.title')}
        description={t('blog.description')}
        image={featured?.image}
        imageAlt={featured ? tx(featured.imageAlt) : ''}
      />
      <section className="bg-page py-20">
        <Container>
          {loading ? (
            <p className="text-sm text-muted">{t('loading')}</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-muted">{t('blog.empty')}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
