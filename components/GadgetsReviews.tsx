import React, { useMemo, useState } from 'react';

interface ReviewItem {
  id: string;
  name: string;
  category: 'Phones' | 'Laptops' | 'Wearables' | 'Audio';
  score: number;
  excerpt: string;
  image: string;
  featured: boolean;
}

const categories = ['All', 'Phones', 'Laptops', 'Wearables', 'Audio'] as const;

type Category = (typeof categories)[number];

const mockReviews: ReviewItem[] = [
  {
    id: 'iphone-15-pro-max-review',
    name: 'iPhone 15 Pro Max review',
    category: 'Phones',
    score: 9.4,
    excerpt: 'Apple’s latest flagship delivers premium build, best-in-class camera performance and strong resale value for power users.',
    image: '📱',
    featured: true,
  },
  {
    id: 'macbook-pro-16-review',
    name: 'MacBook Pro 16 review',
    category: 'Laptops',
    score: 9.1,
    excerpt: 'A performance beast for creatives with unrivaled battery life, but the price premium keeps it out of reach for many.',
    image: '💻',
    featured: false,
  },
  {
    id: 'galaxy-watch-7-review',
    name: 'Galaxy Watch 7 review',
    category: 'Wearables',
    score: 8.6,
    excerpt: 'Comfortable fit, improved health tracking and a polished Wear OS experience make this a top smartwatch pick.',
    image: '⌚',
    featured: false,
  },
  {
    id: 'sony-wh-1000xm5-review',
    name: 'Sony WH-1000XM5 review',
    category: 'Audio',
    score: 8.9,
    excerpt: 'Class-leading noise cancellation and rich sound make these a premium choice for commuters and creatives.',
    image: '🎧',
    featured: false,
  },
  {
    id: 'dell-xps-13-review',
    name: 'Dell XPS 13 review',
    category: 'Laptops',
    score: 8.4,
    excerpt: 'A compact ultraportable with crisp display and great battery life, ideal for productivity on the go.',
    image: '🖥️',
    featured: false,
  },
  {
    id: 'airpods-pro-2-review',
    name: 'AirPods Pro 2 review',
    category: 'Audio',
    score: 8.2,
    excerpt: 'Excellent ANC and effortless integration with Apple devices, though the price may feel steep for some users.',
    image: '🎧',
    featured: false,
  },
];

export const GadgetsReviews: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return mockReviews.filter((review) => {
      const matchesCategory = activeCategory === 'All' || review.category === activeCategory;
      const matchesSearch =
        !query ||
        review.name.toLowerCase().includes(query) ||
        review.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredReview = useMemo(() => {
    return filteredReviews.find((review) => review.featured) ?? filteredReviews[0];
  }, [filteredReviews]);

  const recentReviews = useMemo(() => {
    if (!featuredReview) {
      return filteredReviews;
    }
    return filteredReviews.filter((review) => review.id !== featuredReview.id);
  }, [filteredReviews, featuredReview]);

  return (
    <div className="max-w-[430px] mx-auto w-full px-4 py-4 space-y-5 text-[#F4F5F9]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[#F4F5F9]">Gadgets Reviews</h1>
        <p className="text-xs text-[#9AA3B7]">Honest, in-depth hands-on reviews and scores from the SHEGSTECH lab.</p>
      </div>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA3B7]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.5 20.5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search by device, brand, or category"
          className="w-full rounded-xl border border-[#262E42] bg-[#151B2C] px-4 py-2.5 pl-11 pr-10 text-xs text-[#F4F5F9] placeholder-[#9AA3B7] focus:outline-none focus:border-[#6C63FF] transition-colors"
        />
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#151B2C] p-1 text-[#9AA3B7] transition hover:text-[#F4F5F9]"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 [&::-webkit-scrollbar]:hidden scrollbar-none">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#6C63FF] text-white'
                  : 'bg-[#151B2C] border border-[#262E42] text-[#9AA3B7]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredReviews.length > 0 ? (
        <>
          <div className="rounded-2xl bg-[#151B2C] border border-[#262E42] overflow-hidden shadow-lg">
            <div className="relative h-44 w-full bg-[#1E2638] flex items-center justify-center">
              <div className="absolute top-3 left-3 rounded-md bg-[#6C63FF]/20 px-2.5 py-1 text-[10px] font-semibold text-[#6C63FF] uppercase tracking-[0.2em]">
                {featuredReview?.category}
              </div>
              <div className="text-[3rem] leading-none">{featuredReview?.image}</div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-[#F4F5F9] leading-snug">{featuredReview?.name}</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl bg-[#FBBF24]/10 border border-[#FBBF24]/30 px-3 py-2 text-[10px] font-semibold text-[#FBBF24]">
                  <span>★</span>
                  <span>{featuredReview?.score.toFixed(1)}</span>
                  <span className="text-[#9AA3B7]">/ 10</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-[#9AA3B7] line-clamp-2">{featuredReview?.excerpt}</p>
              <div>
                <button type="button" className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C63FF] hover:underline">
                  <span>Read full review</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-[#F4F5F9]">Recent Reviews</div>
            <div className="space-y-3">
              {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                  <button
                    key={review.id}
                    type="button"
                    className="flex items-center gap-3 rounded-xl bg-[#151B2C] border border-[#262E42] p-3 active:scale-[0.99] transition-transform text-left w-full"
                  >
                    <div className="w-16 h-16 rounded-lg bg-[#1E2638] flex items-center justify-center text-2xl font-semibold">
                      {review.image}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="text-xs font-semibold text-[#F4F5F9] truncate">{review.name}</div>
                      <p className="text-[11px] text-[#9AA3B7] line-clamp-1">{review.excerpt}</p>
                      <span className="text-[10px] text-[#9AA3B7] uppercase tracking-[0.2em]">{review.category}</span>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="inline-flex items-center gap-1 rounded-md bg-[#FBBF24]/10 border border-[#FBBF24]/30 px-2 py-1 text-xs font-bold text-[#FBBF24]">
                        <span>★</span>
                        <span>{review.score.toFixed(1)}</span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-[#262E42] bg-[#151B2C] p-5 text-center text-[#9AA3B7]">
                  <div className="text-sm font-semibold text-[#F4F5F9]">No additional reviews found.</div>
                  <p className="mt-2 text-xs leading-5">Try a different search or category to reveal more gadget reviews.</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#262E42] bg-[#151B2C] p-6 text-center text-[#9AA3B7]">
          <div className="text-sm font-semibold text-[#F4F5F9]">
            {searchQuery ? `No reviews found matching '${searchQuery.trim()}'` : 'No reviews found for this category.'}
          </div>
          <p className="mt-2 text-xs leading-5">
            {searchQuery
              ? 'Clear your search or choose a different category to explore more reviews.'
              : 'Try another category to browse more in-depth gadget reviews.'}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 inline-flex items-center rounded-full border border-[#6C63FF] bg-transparent px-4 py-2 text-xs font-semibold text-[#6C63FF] transition hover:bg-[#1e2540]"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};
