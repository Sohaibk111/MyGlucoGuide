import { useEffect } from 'react';
import { PageId, Article } from '../types';
import { FAQS } from '../data/faqs';

const BASE_SCHEMA_ID = 'structured-data-base';
const FAQ_SCHEMA_ID = 'structured-data-faq';
const ARTICLE_SCHEMA_ID = 'structured-data-article';

function setOrUpdateScript(id: string, schema: object): void {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  const content = JSON.stringify(schema, null, 2);

  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = content;
}

function removeScript(id: string): void {
  document.getElementById(id)?.remove();
}

function formatIsoDate(dateStr: string): string {
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? dateStr : parsed.toISOString().split('T')[0];
}

export function useStructuredData(currentPage: PageId, selectedArticle: Article | null): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const baseSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'MyGlucoGuide',
          description:
            'Educational and patient-focused diabetes and glucose awareness platform for individuals and families in Pakistan.',
        },
        {
          '@type': 'WebSite',
          name: 'MyGlucoGuide',
          description:
            'Simple, practical diabetes education, glucose pattern awareness, and Continuous Glucose Monitoring (CGM) insights for individuals and families across Pakistan.',
          inLanguage: 'en-PK',
        },
        {
          '@type': 'WebApplication',
          name: 'MyGlucoGuide',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Any',
          description:
            'Simple, practical diabetes education, glucose pattern awareness, and Continuous Glucose Monitoring (CGM) insights for individuals and families across Pakistan.',
        },
      ],
    };

    setOrUpdateScript(BASE_SCHEMA_ID, baseSchema);

    if (currentPage === 'faq' && !selectedArticle) {
      setOrUpdateScript(FAQ_SCHEMA_ID, {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    } else {
      removeScript(FAQ_SCHEMA_ID);
    }

    if (selectedArticle) {
      const articleSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: selectedArticle.title,
        description: selectedArticle.summary,
        datePublished: formatIsoDate(selectedArticle.date),
        articleSection: selectedArticle.category,
        publisher: {
          '@type': 'Organization',
          name: 'MyGlucoGuide',
        },
      };

      if (selectedArticle.imageUrl) {
        articleSchema.image = [selectedArticle.imageUrl];
      }

      setOrUpdateScript(ARTICLE_SCHEMA_ID, articleSchema);
    } else {
      removeScript(ARTICLE_SCHEMA_ID);
    }
  }, [currentPage, selectedArticle]);
}
