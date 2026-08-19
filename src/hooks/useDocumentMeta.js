import { useEffect } from 'react';

const DEFAULT_TITLE = 'ZOSIMAS Digital Solution PLC | Web, Mobile & AI Solutions';
const DEFAULT_DESCRIPTION =
  'ZOSIMAS Digital Solution PLC designs and develops modern digital solutions across web, mobile, and AI.';

export function useDocumentMeta({ title, description } = {}) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title || DEFAULT_TITLE;

    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute('content') || '';
    if (meta) {
      meta.setAttribute('content', description || DEFAULT_DESCRIPTION);
    }

    return () => {
      document.title = previousTitle;
      if (meta) meta.setAttribute('content', previousDescription);
    };
  }, [title, description]);
}
