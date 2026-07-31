import React, { useMemo, useState } from 'react';
import { AuthModal } from './AuthModal';

interface Deal {
  id: string;
  title: string;
  condition: string; // e.g., 'UK Used - Pristine' or 'Brand New'
  dealPrice: number;
  originalPrice: number;
  discountPercentage: number; // 20 for 20%
  stockLeft: number;
  category: 'All Deals' | 'UK Used iPhones' | 'Laptops' | 'Flash Sale' | 'Accessories';
  image: string;
}

const categories = ['All Deals', 'UK Used iPhones', 'Laptops', 'Flash Sale', 'Accessories'] as const;

type Category = (typeof categories)[number];

const mockDeals: Deal[] = [
  {
    id: 'deal-iphone-14-pro-max-256-uk',
    title: 'iPhone 14 Pro Max 256GB - UK Used',
    condition: 'UK Used - Pristine',
    dealPrice: 1180000,
    originalPrice: 1450000,
    discountPercentage: 19,
    stockLeft: 2,
    category: 'UK Used iPhones',
    image: '📱',
  },
  {
    id: 'deal-macbook-air-m2-16gb',
    title: 'MacBook Air M2 16GB - Brand New',
    condition: 'Brand New',
    dealPrice: 950000,
    originalPrice: 1150000,
    discountPercentage: 17,
    stockLeft: 5,
    category: 'Laptops',
    image: '💻',
  },
  {
    id: 'deal-samsung-s23-ultra',
    title: 'Samsung Galaxy S23 Ultra - Open Box',
    condition: 'Open Box - Like New',
    dealPrice: 780000,
    originalPrice: 980000,
    discountPercentage: 20,
    stockLeft: 6,
    category: 'Flash Sale',
    image: '📱',
  },
  {
    id: 'deal-anker-powerbank',
    title: 'Anker 20,000mAh Powerbank',
    condition: 'Brand New',
    dealPrice: 28000,
    originalPrice: 45000,
    discountPercentage: 37,
    stockLeft: 20,
    category: 'Accessories',
    image: '🔋',
  },
  {
    id: 'deal-airpods-pro-2',
    title: 'AirPods Pro 2 - Certified',
    condition: 'Certified Pre-Owned',
    dealPrice: 95000,
    originalPrice: 140000,
    discountPercentage: 32,
    stockLeft: 8,
    category: 'Accessories',
    image: '🎧',
  },
  {
    id: 'deal-poco-f5',
    title: 'Poco F5 - Clearance',
    condition: 'Brand New',
    dealPrice: 220000,
    originalPrice: 265000,
    discountPercentage: 17,
    stockLeft: 12,
    category: 'Flash Sale',
    image: '📱',
  },
];

const formatNaira = (value: number) => `₦${value.toLocaleString('en-NG')}`;

export const HotDeals: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All Deals');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'savings' | 'price-asc' | 'price-desc' | 'ending-soon'>('savings');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState('Create a SHEGSTECH account or log in to claim this Hot Deal and lock in your discount.');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const maxStock = useMemo(() => Math.max(...mockDeals.map((d) => d.stockLeft), 1), []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = mockDeals.filter((d) => {
      const matchesCategory = activeCategory === 'All Deals' || d.category === activeCategory;
      const matchesSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.condition.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    // Sorting
    if (sortBy === 'savings') {
      list = list.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else if (sortBy === 'price-asc') {
      list = list.sort((a, b) => a.dealPrice - b.dealPrice);
    } else if (sortBy === 'price-desc') {
      list = list.sort((a, b) => b.dealPrice - a.dealPrice);
    } else if (sortBy === 'ending-soon') {
      list = list.sort((a, b) => a.stockLeft - b.stockLeft);
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const requestAuth = (message: string, action: () => void) => {
    if (!isLoggedIn) {
      setAuthMessage(message);
      setPendingAction(() => action);
      setAuthModalOpen(true);
      return;
    }

    action();
  };

  const openWhatsAppDeal = (deal: Deal) => {
    const message = `Hello SHEGSTECH! I want to claim the deal: ${deal.title} for ${formatNaira(deal.dealPrice)}.`;
    const url = `https://wa.me/2348030000000?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDemoAuth = () => {
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    pendingAction?.();
    setPendingAction(null);
  };

  return (
    <div className="max-w-[430px] mx-auto w-full px-4 py-4 space-y-4 text-[#F4F5F9]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#F4F5F9] flex items-center gap-2">🔥 Hot Deals & Flash Sales</h1>
        <p className="text-xs text-[#9AA3B7]">Handpicked SHEGSTECH certified drops, flash discounts, and limited-stock clearance.</p>
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
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search deals by phone, laptop, or brand..."
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

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden scrollbar-none pb-1 flex-1">
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive ? 'bg-[#6C63FF] text-white' : 'bg-[#151B2C] border border-[#262E42] text-[#9AA3B7]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex-shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#151B2C] border border-[#262E42] text-xs font-medium text-[#F4F5F9] px-3 py-1.5 rounded-xl focus:outline-none focus:border-[#6C63FF] cursor-pointer"
            aria-label="Sort deals"
          >
            <option value="savings">Biggest Savings</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="ending-soon">Ending Soon</option>
          </select>
        </div>
      </div>

      <div className="space-y-3.5">
        {filtered.length > 0 ? (
          filtered.map((deal) => {
            const percent = Math.min(100, Math.max(6, Math.round((deal.stockLeft / maxStock) * 100)));
            return (
              <div key={deal.id} className="p-3.5 rounded-2xl bg-[#151B2C] border border-[#262E42] space-y-3 relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="w-20 h-20 rounded-xl bg-[#1E2638] flex-shrink-0 relative flex items-center justify-center text-3xl font-semibold">
                    <div className="absolute -top-1 -left-1 bg-[#EF4444] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-br-lg rounded-tl-xl">-{deal.discountPercentage}% OFF</div>
                    <div>{deal.image}</div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-md inline-block">{deal.condition}</div>
                    <div className="text-sm font-bold text-[#F4F5F9] truncate">{deal.title}</div>

                    <div>
                      <div className="text-base font-extrabold text-[#F4F5F9]">{formatNaira(deal.dealPrice)}</div>
                      <div className="text-xs text-[#9AA3B7] line-through font-medium">{formatNaira(deal.originalPrice)}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="text-[11px] font-medium text-[#EF4444]">⚡ Only {deal.stockLeft} units left in stock at this price!</div>
                  <div className="w-full h-1.5 bg-[#1E2638] rounded-full overflow-hidden">
                    <div className={`h-full bg-[#EF4444] rounded-full`} style={{ width: `${percent}%` }} />
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() =>
                      requestAuth(
                        'Create a SHEGSTECH account or log in to claim this Hot Deal and lock in your discount.',
                        () => openWhatsAppDeal(deal)
                      )
                    }
                    className="w-full bg-[#6C63FF] hover:bg-[#5b52e0] text-white text-xs font-semibold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    Claim Deal via WhatsApp →
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-3xl border border-dashed border-[#262E42] bg-[#151B2C] p-6 text-center text-[#9AA3B7]">
            <div className="text-sm font-semibold text-[#F4F5F9]">{searchQuery ? `No deals found matching '${searchQuery.trim()}'` : 'No deals available in this category.'}</div>
            <p className="mt-2 text-xs leading-5">{searchQuery ? 'Clear your search or try another category.' : 'Try another filter to reveal hot deals.'}</p>
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="mt-4 inline-flex items-center rounded-full border border-[#6C63FF] bg-transparent px-4 py-2 text-xs font-semibold text-[#6C63FF] transition hover:bg-[#1e2540]">Clear Search</button>
            )}
          </div>
        )}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        subtitle={authMessage}
        onDemo={handleDemoAuth}
        returnTo="/hot-deals"
      />
    </div>
  );
};
