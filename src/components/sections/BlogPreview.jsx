import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { BlogCard } from '../cards/BlogCard';
import { Button } from '../common/Button';
import { useI18n } from '../../hooks/useI18n';
import { usePublishedPosts } from '../../hooks/usePosts';

export function BlogPreview() {
  const { t } = useI18n();
  const { posts, loading } = usePublishedPosts();

  return (
    <section className="overflow-x-hidden bg-surface py-16 lg:flex lg:min-h-[80dvh] lg:flex-col lg:justify-center lg:py-16 dark:bg-page">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t('homeBlog.eyebrow')}
            title={t('homeBlog.title')}
            description={t('homeBlog.description')}
          />
          <Button to="/blog" variant="secondary" arrow>
            {t('homeBlog.cta')}
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {loading
            ? null
            : posts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} compact />
              ))}
        </div>
      </Container>
    </section>
  );
}
