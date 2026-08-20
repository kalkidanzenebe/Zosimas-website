import { Button } from '../components/common/Button';
import { Container } from '../components/common/Container';
import { DigitalNetwork } from '../components/common/DigitalNetwork';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n } from '../hooks/useI18n';

export default function NotFound() {
  const { t } = useI18n();

  useDocumentMeta({
    title: t('notFound.metaTitle'),
    description: t('notFound.metaDescription'),
  });

  return (
    <section className="flex min-h-[80vh] items-center bg-navy-dark pt-28 text-white dark:ring-1 dark:ring-inset dark:ring-white/10">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan">404</p>
          <h1 className="mt-4 text-4xl font-bold">{t('notFound.title')}</h1>
          <p className="mt-4 max-w-md text-white/70">{t('notFound.body')}</p>
          <div className="mt-8">
            <Button to="/" variant="light" arrow>
              {t('notFound.back')}
            </Button>
          </div>
        </div>
        <DigitalNetwork variant="cta" />
      </Container>
    </section>
  );
}
