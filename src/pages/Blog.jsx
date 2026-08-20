import { PageHero } from '../components/common/PageHero';
import { Container } from '../components/common/Container';
import { BlogCard } from '../components/cards/BlogCard';
import { FinalCta } from '../components/sections/FinalCta';
import { posts } from '../data/posts';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n } from '../hooks/useI18n';

export default function Blog() {
  const { t, tx } = useI18n();
  const featured = posts[0];
  const rest = posts.slice(1);

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
          {featured && (
            <div className="mb-8">
              <BlogCard post={featured} />
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
