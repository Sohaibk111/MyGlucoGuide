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
};

export function usePageSEO(currentPage: PageId, selectedArticle: Article | null): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const pageMeta = PAGE_SEO_METADATA[currentPage] || PAGE_SEO_METADATA.home;
    const targetTitle = selectedArticle
      ? `${selectedArticle.title} | MyGlucoGuide`
      : pageMeta.title;
    const targetDescription = selectedArticle?.summary || pageMeta.description;

    document.title = targetTitle;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', targetDescription);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', targetDescription);
      document.head.appendChild(metaDescription);
    }
  }, [currentPage, selectedArticle]);
}
