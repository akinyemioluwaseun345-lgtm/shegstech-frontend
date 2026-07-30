import React, { useMemo, useState } from 'react';

interface Vendor {
  id: string;
  name: string;
  category: 'Flagship Lab' | 'Express Pickups' | 'Direct Delivery' | 'All Hubs';
  location: string;
  rating: number; // 0-5
  inspections: string; // e.g., '500+ Appraised Devices'
  specialties: string[];
  featured?: boolean;
}

const categories = ['All Hubs', 'Flagship Lab', 'Express Pickups', 'Direct Delivery'] as const;
type Category = (typeof categories)[number];

const mockVendors: Vendor[] = [
  {
    id: 'shegstech-main-lab-ikeja',
    name: 'SHEGSTECH Main Lab & Store',
    category: 'Flagship Lab',
    location: 'Computer Village, Ikeja, Lagos',
    rating: 5.0,
    inspections: '500+ Appraised Devices',
    specialties: ['Certified Pre-Owned', 'Lab Tested', 'Full Diagnostics'],
    featured: true,
  },
  {
    id: 'shegstech-express-vi',
    name: 'SHEGSTECH Express Hub - Victoria Island',
    category: 'Express Pickups',
    location: 'Victoria Island, Lagos',
    rating: 4.9,
    inspections: '200+ Appraised Devices',
    specialties: ['Express Dispatch', 'Same-day Pickup'],
  },
  {
    id: 'shegstech-direct-online',
    name: 'SHEGSTECH Direct Online Dispatch',
    category: 'Direct Delivery',
    location: 'Nationwide (Online)',
    rating: 4.8,
    inspections: '1000+ Appraised Devices',
    specialties: ['Doorstep Inspection', 'Insured Transit'],
  },
  {
    id: 'shegstech-branch-abuja',
    name: 'SHEGSTECH Regional Hub - Abuja',
    category: 'Express Pickups',
    location: 'Wuse, Abuja',
    rating: 4.7,
    inspections: '150+ Appraised Devices',
    specialties: ['Certified Pre-Owned', 'Local Support'],
  },
];

const formatRating = (r: number) => r.toFixed(1);

export const VerifiedVendors: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All Hubs');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return mockVendors.filter((vendor) => {
      const matchesCategory = activeCategory === 'All Hubs' || vendor.category === activeCategory;
      const matchesSearch =
        !q ||
        vendor.name.toLowerCase().includes(q) ||
        vendor.location.toLowerCase().includes(q) ||
        vendor.specialties.join(' ').toLowerCase().includes(q) ||
        vendor.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-[430px] mx-auto w-full px-4 py-4 space-y-4 text-[#F4F5F9]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#F4F5F9]">Verified Vendors</h1>
        <p className="text-xs text-[#9AA3B7]">Official SHEGSTECH vetted hubs and certified gadget distribution centers.</p>
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
          placeholder="Search SHEGSTECH hubs, stock categories, or locations..."
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
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                isActive ? 'bg-[#6C63FF] text-white' : 'bg-[#151B2C] border border-[#262E42] text-[#9AA3B7]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="space-y-3.5">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => (
            <div key={vendor.id} className="p-4 rounded-2xl bg-[#151B2C] border border-[#262E42] space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/15 border border-[#6C63FF]/30 flex-shrink-0 flex items-center justify-center text-lg font-bold text-[#6C63FF]">
                  ST
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className="text-sm font-bold text-[#F4F5F9] leading-tight truncate">{vendor.name}</div>
                    <div className="ml-2 inline-flex items-center gap-1 rounded-md bg-[#10B981]/15 px-2 py-0.5 text-[10px] font-semibold text-[#10B981]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Official Verified</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#9AA3B7] mt-1 truncate">{vendor.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-2 rounded-md bg-[#FBBF24]/10 px-2 py-0.5 text-[11px] font-semibold text-[#FBBF24]">
                  <span>★</span>
                  <span>{formatRating(vendor.rating)}</span>
                  <span className="text-[#9AA3B7]">Rating</span>
                </div>

                <div className="inline-flex items-center gap-1 rounded-md bg-[#10B981]/10 px-2 py-0.5 text-[11px] font-medium text-[#10B981]">
                  <span>Guarantee</span>
                </div>

                <div className="text-[11px] text-[#9AA3B7]">{vendor.inspections}</div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {vendor.specialties.map((s) => (
                  <div key={s} className="text-[11px] text-[#9AA3B7] bg-[#0B0F1A]/0 px-2 py-1 rounded-md">{s}</div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button className="flex-1 bg-[#6C63FF] hover:bg-[#5b52e0] text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                  Contact SHEGSTECH Hub
                </button>
                <button className="bg-[#1E2638] border border-[#262E42] text-[#F4F5F9] text-xs font-semibold px-3 py-2.5 rounded-xl hover:bg-[#262E42] transition-colors">
                  View Hub Stock
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-[#262E42] bg-[#151B2C] p-6 text-center text-[#9AA3B7]">
            <div className="text-sm font-semibold text-[#F4F5F9]">{searchQuery ? `No vendors found matching '${searchQuery.trim()}'` : 'No vendors found for this category.'}</div>
            <p className="mt-2 text-xs leading-5">{searchQuery ? 'Clear your search or choose a different category to view official hubs.' : 'Try another category to reveal more verified vendors.'}</p>
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="mt-4 inline-flex items-center rounded-full border border-[#6C63FF] bg-transparent px-4 py-2 text-xs font-semibold text-[#6C63FF] transition hover:bg-[#1e2540]">Clear Search</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
