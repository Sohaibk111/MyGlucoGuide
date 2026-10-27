import { useEffect } from 'react';
import { PageId, Article } from '../types';

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

    document.title = targetTitle;

    const setMetaContent = (selector: string, attribute: string, content: string, createTag: 'name' | 'property' = 'name') => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(createTag, selector.includes('og:') || selector.includes('twitter:') ? selector.match(/["']([^"']+)["']/)?.[1] || '' : selector.match(/["']([^"']+)["']/)?.[1] || '');
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    setMetaContent('meta[name="description"]', 'content', targetDescription);
    setMetaContent('meta[property="og:title"]', 'content', targetTitle, 'property');
    setMetaContent('meta[property="og:description"]', 'content', targetDescription, 'property');
    setMetaContent('meta[name="twitter:title"]', 'content', targetTitle);
    setMetaContent('meta[name="twitter:description"]', 'content', targetDescription);
  }, [currentPage, selectedArticle]);
}
