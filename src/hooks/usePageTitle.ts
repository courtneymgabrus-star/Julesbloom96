import { useEffect } from 'react';

export function usePageTitle(pageTitle: string, metaDescription?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const metaTag = document.querySelector('meta[name="description"]');
    const previousMeta = metaTag ? metaTag.getAttribute('content') : null;

    // Set title
    if (pageTitle.includes('|')) {
      document.title = pageTitle;
    } else {
      document.title = `${pageTitle} | Jules in Bloom`;
    }

    // Set meta description
    if (metaDescription && metaTag) {
      metaTag.setAttribute('content', metaDescription);
    }

    // Cleanup and restore on unmount
    return () => {
      document.title = previousTitle;
      if (previousMeta && metaTag) {
        metaTag.setAttribute('content', previousMeta);
      }
    };
  }, [pageTitle, metaDescription]);
}
