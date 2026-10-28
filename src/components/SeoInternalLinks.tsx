import React from 'react';
import { Article, PageId } from '../types';
import { ARTICLES } from '../data/articles';

interface SeoInternalLinksProps {
  currentPage: PageId;
  selectedArticle: Article | null;
}

const LINK_STYLE = 'text-sm font-medium text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-100 underline underline-offset-4 decoration-sky-300/70 transition';

export const SeoInternalLinks: React.FC<SeoInternalLinksProps> = ({ currentPage, selectedArticle }) => {
  const links: Array<{ href: string; label: string }> = selectedArticle
    ? [
        { href: '/blog', label: 'Browse all diabetes education articles' },
        { href: '/cgm', label: 'Learn how continuous glucose monitoring works' },
        { href: '/faq', label: 'Read frequently asked diabetes and CGM questions' },
        ...ARTICLES
          .filter((article) => article.slug !== selectedArticle.slug && article.category === selectedArticle.category)
          .slice(0, 2)
          .map((article) => ({ href: `/${article.slug}`, label: article.title })),
      ]
    : currentPage === 'home'
      ? [
          { href: '/cgm', label: 'Learn how CGM works' },
          { href: '/education', label: 'Explore diabetes education' },
          { href: '/blog', label: 'Browse educational articles' },
          { href: '/faq', label: 'Read diabetes and CGM FAQs' },
        ]
      : currentPage === 'cgm'
        ? [
            { href: '/cgm-pakistan-price-comparison', label: 'Compare CGM features and prices in Pakistan' },
            { href: '/blog', label: 'Browse diabetes education articles' },
            { href: '/faq', label: 'Read CGM frequently asked questions' },
          ]
        : currentPage === 'blog'
          ? [
              { href: '/education', label: 'Explore diabetes education' },
              { href: '/faq', label: 'Read diabetes and CGM FAQs' },
              { href: '/cgm', label: 'Learn about continuous glucose monitoring' },
            ]
          : currentPage === 'education'
            ? [
                { href: '/faq', label: 'Read diabetes and CGM FAQs' },
                { href: '/blog', label: 'Browse all educational articles' },
                { href: '/hba1c-explained', label: 'Understand HbA1c' },
                { href: '/cgm', label: 'Learn about continuous glucose monitoring' },
              ]
            : currentPage === 'faq'
              ? [
                  { href: '/education', label: 'Explore diabetes education' },
                  { href: '/blog', label: 'Browse educational articles' },
                  { href: '/cgm', label: 'Learn about CGM' },
                ]
              : [
                  { href: '/blog', label: 'Browse educational articles' },
                  { href: '/faq', label: 'Read frequently asked questions' },
                  { href: '/cgm', label: 'Learn about CGM' },
                ];

  return (
    <section aria-labelledby="related-navigation-title" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-2xl border border-line/80 bg-surface-2/70 p-5 sm:p-6">
        <h2 id="related-navigation-title" className="text-base font-bold text-fg mb-3">
          {selectedArticle ? 'Related Diabetes & CGM Guides' : 'Explore More on MyGlucoGuide'}
        </h2>
        <nav aria-label="Related internal pages">
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={LINK_STYLE}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};
