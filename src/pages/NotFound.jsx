import { Button } from '../components/common/Button';
import { Container } from '../components/common/Container';
import { DigitalNetwork } from '../components/common/DigitalNetwork';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta({
    title: 'Page not found | ZOSIMAS',
    description: 'The requested page could not be found on the ZOSIMAS website.',
  });

  return (
    <section className="flex min-h-[80vh] items-center bg-navy-dark pt-28 text-white">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan">404</p>
          <h1 className="mt-4 text-4xl font-bold">This path is not connected.</h1>
          <p className="mt-4 max-w-md text-white/70">
            The page you requested does not exist. Return to the network and continue from the homepage.
          </p>
          <div className="mt-8">
            <Button to="/" variant="light" arrow>
              Back to home
            </Button>
          </div>
        </div>
        <DigitalNetwork variant="cta" />
      </Container>
    </section>
  );
}
