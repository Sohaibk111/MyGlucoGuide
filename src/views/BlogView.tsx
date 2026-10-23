import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight, MessageCircle } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';

interface BlogViewProps {
  onSelectArticle: (article: Article) => void;
  onOpenWhatsApp: (source: string) => void;
}

type CategoryFilter =
  | 'All'
  | 'Diabetes Basics'
  | 'Glucose Monitoring'
  | 'Food & Lifestyle'
  | 'CGM'
  | 'Diabetes Complications'
  | 'Practical Tips';

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Diabetes Basics',
  'Glucose Monitoring',
  'Food & Lifestyle',
  'CGM',
  'Diabetes Complications',
  'Practical Tips',
];

// One exact 4 × 2 sprite contains the eight blog visuals already approved for the site.
// Keep the same crop mapping in the blog cards and ArticleModal so images never mix.
const BLOG_VISUALS: Record<string, string> = {
  'hba1c-explained': '0% 0%',
  'why-glucose-rises-after-meals': '33.3333% 0%',
  'cgm-vs-finger-prick-which-is-better': '66.6667% 0%',
  'diabetes-and-eye-health': '100% 0%',
  'diabetes-and-heart-health': '0% 100%',
  'understanding-glucose-patterns': '33.3333% 100%',
  'diabetes-myths-and-facts-pakistan': '66.6667% 100%',
  'ramadan-fasting-diabetes-awareness': '100% 100%',
};

const BLOG_VISUAL_SPRITE = '/assets/images/blog-visuals-sprite.webp';

export const BlogView: React.FC<BlogViewProps> = ({
  onSelectArticle,
  onOpenWhatsApp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCategory =
      selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleArticleClick = (art: Article) => {
    trackEvent('article_view', {
      article_slug: art.slug,
      article_title: art.title,
      category: art.category,
    });
    onSelectArticle(art);
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-300" />
          <span>Educational Resources</span>
        </div>
        <h1
          className="text-3xl sm:text-5xl font-extrabold text-fg tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Learning Center
        </h1>
        <p className="mt-3 text-base text-fg-3 leading-relaxed">
          Useful articles, tips and guides to help you understand diabetes, glucose numbers, and live a healthier life in Pakistan.
        </p>
      </div>

      {/* Search Bar & Category Controls */}
      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 text-fg-5 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles (e.g. HbA1c, roti, CGM, spikes, dawn phenomenon)..."
            className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm text-fg-2 placeholder-fg-5 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-fg-5 hover:text-fg-3 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-3 rounded-xl overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-surface text-fg shadow-xs font-semibold'
                    : 'text-fg-3 hover:text-fg'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-xs text-fg-4">
        Showing <span className="font-semibold text-fg-2">{filteredArticles.length}</span>{' '}
        {filteredArticles.length === 1 ? 'article' : 'articles'}
        {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center bg-surface rounded-2xl border border-line">
          <BookOpen className="w-8 h-8 text-fg-5 mx-auto mb-2" />
          <p className="text-sm font-semibold text-fg-2">No articles found matching your search</p>
          <p className="text-xs text-fg-4 mt-1">Try searching for broader terms like "glucose", "meal", or "CGM".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 rounded-lg text-xs font-medium bg-surface-3 text-fg-2 hover:bg-surface-4 transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredArticles.map((art) => {
            const visualPosition = BLOG_VISUALS[art.slug];

            return (
              <article
                key={art.id}
                className="bg-surface rounded-2xl border border-line/80 shadow-xs hover:shadow-md hover:border-sky-300 dark:hover:border-sky-400/40 transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Featured Image — exact approved sprite tile */}
                  {visualPosition ? (
                    <div
                      role="img"
                      aria-label={art.title}
                      className="aspect-16/9 w-full bg-surface-3 overflow-hidden relative border-b border-line-soft bg-no-repeat"
                      style={{
                        backgroundImage: `url(${BLOG_VISUAL_SPRITE})`,
                        backgroundSize: '400% 200%',
                        backgroundPosition: visualPosition,
                      }}
                    />
                  ) : art.imageUrl ? (
                    <div className="aspect-16/9 w-full bg-surface-3 overflow-hidden relative border-b border-line-soft">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="aspect-16/9 w-full bg-sky-50 dark:bg-sky-400/10 flex items-center justify-center border-b border-line-soft text-sky-300">
                      <BookOpen className="w-10 h-10" />
                    </div>
                  )}

                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-fg-4">
                      <span className="text-sky-700 dark:text-sky-300 font-semibold">{art.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-fg leading-snug line-clamp-2">
                      {art.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-fg-3 leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 border-t border-line-soft mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-fg-5">{art.date}</span>
                  <button
                    type="button"
                    onClick={() => handleArticleClick(art)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-100 transition cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="p-6 sm:p-8 rounded-2xl bg-sky-50/70 dark:bg-sky-400/10 border border-sky-100 dark:border-sky-400/25 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-sky-950 dark:text-sky-100">Looking for a specific diabetes topic?</h3>
          <p className="text-xs sm:text-sm text-sky-900 dark:text-sky-100 mt-0.5">
            Suggest a topic or ask our health educator team on WhatsApp.
          </p>
        </div>
        <button
          id="blog-suggest-whatsapp-btn"
          onClick={() => {
            trackWhatsAppClick({
              sourceLocation: 'blog_suggest_topic',
              page: 'blog',
              ctaIdentifier: 'blog-suggest-whatsapp-btn',
            });
            onOpenWhatsApp('blog_suggest');
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition cursor-pointer shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Ask on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
