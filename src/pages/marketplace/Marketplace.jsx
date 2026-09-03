import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Marketplace.css';
import AppHeader from '../../components/AppHeader.jsx';

const SEED_LOTS = [
  { id: 'LOT-48210', category: 'Heavy Equipment', location: 'Nagpur', format: 'TENDER', condition: 'Used', price: 1840000, sellerRating: 3.8, matches: true, postedDaysAgo: 3 },
  { id: 'LOT-49012', category: 'Industrial Machinery', location: 'Pune', format: 'EASY', condition: 'Used', price: 320000, sellerRating: 3.8, matches: true, postedDaysAgo: 0 },
  { id: 'LOT-49510', category: 'Vehicles', location: 'Mumbai', format: 'BUY-NOW', condition: 'Used', price: 990000, sellerRating: 4.6, matches: false, postedDaysAgo: 12 },
  { id: 'LOT-50120', category: 'Textiles', location: 'Surat', format: 'EXPRESS', condition: 'New', price: 500000, sellerRating: 4.2, matches: true, postedDaysAgo: 1 },
  { id: 'LOT-50221', category: 'Scrap Metal', location: 'Nagpur', format: 'EASY', condition: 'Used', price: 610000, sellerRating: 3.8, matches: true, postedDaysAgo: 2 },
  { id: 'LOT-50310', category: 'Industrial Machinery', location: 'Surat', format: 'BUY-NOW', condition: 'Refurbished', price: 245000, sellerRating: 4.2, matches: false, postedDaysAgo: 20 },
  { id: 'LOT-50400', category: 'Heavy Equipment', location: 'Mumbai', format: 'TENDER', condition: 'Used', price: 780000, sellerRating: 4.6, matches: true, postedDaysAgo: 5 },
  { id: 'LOT-50488', category: 'Furniture', location: 'Pune', format: 'EASY', condition: 'For Parts', price: 85000, sellerRating: 3.8, matches: false, postedDaysAgo: 8 },
];
const FORMATS = ['all', 'BUY-NOW', 'EASY', 'EXPRESS', 'TENDER'];
const CATEGORIES = ['all', 'Heavy Equipment', 'Industrial Machinery', 'Vehicles', 'Textiles', 'Scrap Metal', 'Furniture'];
const PER_PAGE = 6;

export default function Marketplace() {
  const [f, setF] = useState({ query: '', location: '', priceMin: '', priceMax: '', minRating: '', condition: '', posted: '', format: 'all', category: 'all', sort: 'recent', page: 1 });
  const [searchSaved, setSearchSaved] = useState(false);
  const set = (patch) => setF({ ...f, ...patch, page: patch.page ?? 1 });

  const filtered = useMemo(() => {
    let all = SEED_LOTS;
    if (f.format !== 'all') all = all.filter((l) => l.format === f.format);
    if (f.category !== 'all') all = all.filter((l) => l.category === f.category);
    const q = f.query.trim().toLowerCase();
    if (q) all = all.filter((l) => l.category.toLowerCase().includes(q));
    if (f.location.trim()) all = all.filter((l) => l.location.toLowerCase().includes(f.location.trim().toLowerCase()));
    if (f.priceMin) all = all.filter((l) => l.price >= Number(f.priceMin));
    if (f.priceMax) all = all.filter((l) => l.price <= Number(f.priceMax));
    if (f.minRating) all = all.filter((l) => l.sellerRating >= Number(f.minRating));
    if (f.condition) all = all.filter((l) => l.condition === f.condition);
    if (f.posted) { const days = { '24h': 1, '7d': 7, '30d': 30 }[f.posted]; all = all.filter((l) => l.postedDaysAgo <= days); }
    const sorted = [...all];
    if (f.sort === 'recent' || f.sort === 'ending_soon') sorted.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    if (f.sort === 'price_low') sorted.sort((a, b) => a.price - b.price);
    if (f.sort === 'price_high') sorted.sort((a, b) => b.price - a.price);
    if (f.sort === 'rating') sorted.sort((a, b) => b.sellerRating - a.sellerRating);
    return sorted;
  }, [f]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(f.page, totalPages);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="mk-page">
      <AppHeader variant="light" contextNav={[{ label: "Marketplace", to: "/marketplace", active: true }, { label: "Saved Searches", to: "/saved-searches" }]} />

      <main className="mk-main">
        <div className="mk-title-row">
          <h1>Browse All Listings</h1>
          <span className="mk-count">{filtered.length} of {SEED_LOTS.length} active Listings</span>
        </div>
        <p className="mk-sub">Adjust filters below, then <button onClick={() => setSearchSaved(true)} className="mk-link-btn">save this search</button> to re-run it later.</p>
        {searchSaved && <p className="mk-saved">Search saved — find it under Saved Searches.</p>}

        <div className="mk-layout">
          <aside className="mk-filters">
            <input className="mk-input" placeholder="Search category…" value={f.query} onChange={(e) => set({ query: e.target.value })} />
            <div>
              <div className="mk-label">Location</div>
              <input className="mk-input mk-input--sm" placeholder="City or region" value={f.location} onChange={(e) => set({ location: e.target.value })} />
            </div>
            <div>
              <div className="mk-label">Price (₹)</div>
              <div className="mk-row">
                <input type="number" className="mk-input mk-input--sm" placeholder="Min" value={f.priceMin} onChange={(e) => set({ priceMin: e.target.value })} />
                <input type="number" className="mk-input mk-input--sm" placeholder="Max" value={f.priceMax} onChange={(e) => set({ priceMax: e.target.value })} />
              </div>
            </div>
            <div>
              <div className="mk-label">Min. Seller Rating</div>
              <select className="mk-select" value={f.minRating} onChange={(e) => set({ minRating: e.target.value })}>
                <option value="">Any</option><option value="3">3★+</option><option value="4">4★+</option><option value="5">5★+</option>
              </select>
            </div>
            <div>
              <div className="mk-label">Condition</div>
              <select className="mk-select" value={f.condition} onChange={(e) => set({ condition: e.target.value })}>
                <option value="">Any condition</option><option value="New">New</option><option value="Used">Used</option><option value="Refurbished">Refurbished</option><option value="For Parts">For Parts</option>
              </select>
            </div>
            <div>
              <div className="mk-label">Posted</div>
              <select className="mk-select" value={f.posted} onChange={(e) => set({ posted: e.target.value })}>
                <option value="">Any time</option><option value="24h">Last 24 hours</option><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option>
              </select>
            </div>
            <div>
              <div className="mk-label">Format</div>
              <div className="mk-btn-col">
                {FORMATS.map((v) => (
                  <button key={v} onClick={() => set({ format: v })} className={`mk-filter-btn${f.format === v ? ' mk-filter-btn--active' : ''}`}>{v === 'all' ? 'All Formats' : v}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="mk-label">Category</div>
              <div className="mk-chip-row">
                {CATEGORIES.map((v) => (
                  <button key={v} onClick={() => set({ category: v })} className={`mk-chip${f.category === v ? ' mk-chip--active' : ''}`}>{v === 'all' ? 'All' : v}</button>
                ))}
              </div>
            </div>
            <button className="mk-clear" onClick={() => setF({ query: '', location: '', priceMin: '', priceMax: '', minRating: '', condition: '', posted: '', format: 'all', category: 'all', sort: f.sort, page: 1 })}>Clear All Filters</button>
          </aside>

          <div>
            <div className="mk-sort-row">
              <select className="mk-select" value={f.sort} onChange={(e) => setF({ ...f, sort: e.target.value })}>
                <option value="recent">Recent first</option><option value="ending_soon">Ending soon</option>
                <option value="price_low">Price: low to high</option><option value="price_high">Price: high to low</option><option value="rating">Seller rating</option>
              </select>
            </div>

            <div className="mk-grid">
              {visible.map((lot) => (
                <Link key={lot.id} to={`/lot-detail?id=${lot.id}`} className="mk-card">
                  <div className="mk-card__photo">
                    <span className="mk-card__format">{lot.format}</span>
                    {lot.matches && <span className="mk-card__match">✓ Matches your preferences</span>}
                  </div>
                  <div className="mk-card__body">
                    <div className="mk-card__meta">{lot.format} · {lot.condition}</div>
                    <div className="mk-card__title">{lot.category}</div>
                    <div className="mk-card__row"><span className="mk-card__price">₹{lot.price.toLocaleString('en-IN')}</span><span className="mk-card__rating">Seller {lot.sellerRating.toFixed(1)}★</span></div>
                  </div>
                </Link>
              ))}
            </div>
            {filtered.length === 0 && <div className="mk-empty">No Listings match this filter.</div>}
            {totalPages > 1 && (
              <div className="mk-pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => set({ page: n })} className="mk-page-btn" style={{ fontWeight: n === page ? 800 : 400, color: n === page ? 'var(--color-accent)' : 'var(--color-text-faint)' }}>{n}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
