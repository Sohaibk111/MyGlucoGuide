import { useEffect } from 'react';
import { PageId, Article } from '../types';
import { SITE_URL } from '../config/site';

interface PageMetadata {
  title: string;
  description: string;
}

const PAGE_SEO_METADATA: Record<PageId, PageMetadata> = {
  home: {
    title: 'MyGlucoGuide - Pakistan Diabetes Education & Glucose Awareness',
    description:
      'Simple, practical diabetes education, glucose pattern awareness, and Continuous Glucose Monitoring (CGM) insights for individuals and families across Pakistan.',
  },
  about: {
    title: 'About MyGlucoGuide | Diabetes Education in Pakistan',
    description:
      "Learn about MyGlucoGuide's educational mission to bring clear diabetes awareness, glucose literacy, and CGM guidance to families across Pakistan.",
  },
  education: {
    title: 'Diabetes Education | MyGlucoGuide',
    description:
      'Evidence-based educational guides on blood glucose patterns, HbA1c, dietary awareness, and lifestyle principles for diabetes management in Pakistan.',
  },
  cgm: {
    title: 'Continuous Glucose Monitoring (CGM) | MyGlucoGuide',
    description:
      'Objective guide to Continuous Glucose Monitoring (CGM) technology, sensor wear, interstitial fluid tracking, and trend arrow interpretation in Pakistan.',
  },
  blog: {
    title: 'Diabetes & Glucose Education Blog | MyGlucoGuide',
    description:
      'Explore educational articles on glucose variability, nutrition considerations, routine screenings, and diabetes awareness for Pakistani households.',
  },
  faq: {
    title: 'Diabetes FAQs | MyGlucoGuide',
    description:
      'Frequently asked questions regarding blood glucose levels, Continuous Glucose Monitors, daily monitoring routines, and diabetes care in Pakistan.',
  },
  contact: {
    title: 'Contact MyGlucoGuide',
    description:
      'Get in touch with MyGlucoGuide for inquiries, educational support, or guidance on diabetes awareness and glucose monitoring resources.',
  },
  purchase: {
    title: 'EvoCheck Premium LinX CGM | Product Information & WhatsApp Order',
    description:
      'Review EvoCheck Premium LinX CGM product information and submit an order inquiry through WhatsApp. Confirm suitability with a healthcare professional.',
  },
};

export function usePageSEO(currentPage: PageId, selectedArticle: Article | null): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const pageMeta = PAGE_SEO_METADATA[currentPage] || PAGE_SEO_METADATA.home;
    const isCgmPakistanGuide = selectedArticle?.slug === 'cgm-pakistan-price-comparison';
    const targetTitle = isCgmPakistanGuide
      ? 'CGM in Pakistan: Prices, Features & Buying Guide | MyGlucoGuide'
      : selectedArticle
        ? `${selectedArticle.title} | MyGlucoGuide`
        : pageMeta.title;
    const targetDescription = isCgmPakistanGuide
      ? 'Explore CGM prices in Pakistan, sensor features, wear time, compatibility, and buying questions. Verify current specifications and consult your healthcare professional.'
      : selectedArticle?.summary || pageMeta.description;
    const canonicalUrl = selectedArticle
      ? new URL(`/${selectedArticle.slug}`, SITE_URL).href
      : new URL(window.location.pathname, SITE_URL).href;

    document.title = targetTitle;

    const setMetaContent = (
      selector: string,
      content: string,
      keyAttribute: 'name' | 'property',
      key: string,
    ) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(keyAttribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaContent('meta[name="description"]', targetDescription, 'name', 'description');
    setMetaContent('meta[property="og:type"]', selectedArticle ? 'article' : 'website', 'property', 'og:type');
    setMetaContent('meta[property="og:title"]', targetTitle, 'property', 'og:title');
    setMetaContent('meta[property="og:description"]', targetDescription, 'property', 'og:description');
    setMetaContent('meta[property="og:url"]', canonicalUrl, 'property', 'og:url');
    setMetaContent('meta[name="twitter:card"]', 'summary_large_image', 'name', 'twitter:card');
    setMetaContent('meta[name="twitter:title"]', targetTitle, 'name', 'twitter:title');
    setMetaContent('meta[name="twitter:description"]', targetDescription, 'name', 'twitter:description');

    const socialImage = new URL(
      selectedArticle?.imageUrl || '/assets/images/cgm_monitoring.png',
      SITE_URL,
    ).href;
    setMetaContent('meta[property="og:image"]', socialImage, 'property', 'og:image');
    setMetaContent(
      'meta[property="og:image:alt"]',
      selectedArticle?.title || 'MyGlucoGuide diabetes education and glucose awareness',
      'property',
      'og:image:alt',
    );
    setMetaContent('meta[name="twitter:image"]', socialImage, 'name', 'twitter:image');
    setMetaContent(
      'meta[name="twitter:image:alt"]',
      selectedArticle?.title || 'MyGlucoGuide diabetes education and glucose awareness',
      'name',
      'twitter:image:alt',
    );

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [currentPage, selectedArticle]);
}
