import { Link } from 'react-router-dom';
import LightDashboardHeader from '../../components/LightDashboardHeader.jsx';
import './BuyerDashboard.css';

const NAV_ITEMS = [
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Dashboard', to: '/buyer/dashboard', active: true },
  { label: 'Trust & Support', to: '/trust-and-support' },
];
const CTAS = [{ label: 'Profile', to: '#' }, { label: 'Log Out', to: '/' }];

const H1 = { standing: 'H1', standingColor: 'var(--color-success)', standingBg: 'var(--color-success-bg)' };
const other = (label) => ({ standing: label, standingColor: 'var(--color-text-faint)', standingBg: '#F1F2ED' });

const STATS = { activeBids: 6, activeOffers: 2, pendingRatings: 1, favorites: 9 };
const TICKER_BIDS = [
  { category: 'CNC Lathe (Surplus)', format: 'EASY', amount: '₹3,42,000', ...H1 },
  { category: 'Salvage — Sedan', format: 'EXPRESS', amount: '₹1,85,500', ...other('Outbid') },
];
const TICKER_INTEREST = [
  { category: 'Repossessed Loader', price: '₹9,40,000' },
  { category: 'Industrial Surplus Lot', price: '₹2,10,000' },
];
const BIDS = [
  { category: 'CNC Lathe (Surplus)', format: 'EASY', amount: '₹3,42,000', ...H1 },
  { category: 'Salvage — Sedan', format: 'EXPRESS', amount: '₹1,85,500', ...other('Outbid') },
  { category: 'Warehouse Racking Lot', format: 'EASY', amount: '₹64,000', ...H1 },
  { category: 'Repossessed Tractor', format: 'BUY_NOW', amount: '₹5,20,000', ...other('Defaulted') },
];
const OFFERS = [
  { category: 'Scrap Metal Bundle — 4T', amount: '₹88,000', status: 'Submitted', canWithdraw: true },
  { category: 'Office Furniture Lot', amount: '₹22,500', status: 'Accepted', canWithdraw: false },
];
const PURCHASES = [
  { date: '2026-07-18', format: 'EASY', price: '₹3,10,000', seller: '98xxxxxx21', status: 'Completed', actionLabel: 'View Settlement', actionHref: '#' },
  { date: '2026-07-02', format: 'TENDER', price: '₹12,40,000', seller: '97xxxxxx08', status: 'Completed', actionLabel: 'View Chronicle', actionHref: '#' },
  { date: '2026-06-25', format: 'EXPRESS', price: '₹1,15,000', seller: '99xxxxxx44', status: 'Stalled', actionLabel: 'View Dispute', actionHref: '#' },
];
const FAVORITES = [
  { format: 'EASY', category: 'Diesel Generator Set', price: '₹1,80,000' },
  { format: 'TENDER', category: 'Repossessed Excavator', price: '₹18,50,000' },
  { format: 'EXPRESS', category: 'Steel Coil Surplus', price: '₹4,40,000' },
  { format: 'BUY NOW', category: 'Office IT Assets Lot', price: '₹95,000' },
];
const RECOMMENDATIONS = [
  { format: 'EASY', bidCount: 14, category: 'Industrial Compressor', price: '₹2,60,000', isMatch: true },
  { format: 'TENDER', bidCount: 6, category: 'Fleet — 3 Vans', price: '₹22,00,000', isMatch: false },
  { format: 'EXPRESS', bidCount: 9, category: 'Copper Wire Scrap', price: '₹3,30,000', isMatch: false },
  { format: 'EASY', bidCount: 21, category: 'CNC Milling Machine', price: '₹6,10,000', isMatch: true },
];
const QUICK_LINKS = [
  ['Profile', '#'], ['KYC', '#'], ['Preferences', '#'], ['Invoices', '#'], ['Payout Bank', '#'],
];

export default function BuyerDashboard() {
  return (
    <div className="bd-page">
      <LightDashboardHeader navItems={NAV_ITEMS} ctas={CTAS} />

      <aside className="bd-ticker">
        <p className="bd-ticker-title">Live Ticker</p>
        <p className="bd-ticker-sub">Filtered by your <Link to="#">CAT-LOC-VAL preferences</Link></p>
        {TICKER_BIDS.map((t) => (
          <Link to="#" key={t.category} className="bd-ticker-row">
            <div className="bd-ticker-row-top">{t.category} <span className="bd-ticker-format">{t.format}</span></div>
            <div className="bd-ticker-row-bottom">
              <span className="bd-ticker-amount">{t.amount}</span>
              <span className="bd-ticker-standing" style={{ color: t.standingColor }}>{t.standing}</span>
            </div>
          </Link>
        ))}
        <p className="bd-ticker-title" style={{ marginTop: 22 }}>Sales of Interest</p>
        {TICKER_INTEREST.map((m) => (
          <Link to="#" key={m.category} className="bd-ticker-row">
            <div className="bd-ticker-row-top">{m.category}</div>
            <div className="bd-ticker-interest-price">{m.price}</div>
          </Link>
        ))}
        <Link to="#" className="bd-ticker-tune">Tune your preferences →</Link>
      </aside>

      <main className="bd-main">
        <div className="bd-title-row">
          <h1 className="bd-h1">Welcome back, Ravi Kumar</h1>
          <span className="bd-kyc-badge">KYC Verified</span>
        </div>
        <p className="bd-sub">Here's everything moving on your account right now.</p>

        <div className="bd-stats">
          <div className="bd-stat-card"><b>{STATS.activeBids}</b><span>Active Bids</span></div>
          <div className="bd-stat-card"><b>{STATS.activeOffers}</b><span>Open Offers</span></div>
          <div className="bd-stat-card"><b className="text-gold">{STATS.pendingRatings}</b><span>Purchases to Rate</span></div>
          <div className="bd-stat-card"><b>{STATS.favorites}</b><span>Favorites</span></div>
        </div>

        <section className="bd-section">
          <div className="bd-section-head">
            <h2 className="bd-h2">My Bids</h2>
            <div className="bd-filters">
              <select className="bd-select"><option>All formats</option></select>
              <select className="bd-select"><option>All standings</option></select>
            </div>
          </div>
          <div className="bd-table">
            {BIDS.map((b, i) => (
              <Link to="#" key={i} className="bd-bid-row">
                <span className="bd-bid-cat">{b.category} <span className="bd-ticker-format">{b.format}</span></span>
                <span className="bd-bid-right">
                  <span className="bd-bid-amount">{b.amount}</span>
                  <span className="bd-badge" style={{ color: b.standingColor, background: b.standingBg }}>{b.standing}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bd-section">
          <h2 className="bd-h2">My Offers</h2>
          <div className="bd-table">
            {OFFERS.map((o, i) => (
              <div key={i} className="bd-offer-row">
                <Link to="#" className="bd-offer-label">{o.category} — {o.amount}</Link>
                <span className="bd-offer-right">
                  <span className="bd-offer-status">{o.status}</span>
                  {o.canWithdraw && <Link to="#" className="bd-withdraw-btn">Withdraw</Link>}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bd-section">
          <div className="bd-section-head">
            <h2 className="bd-h2">My Purchases</h2>
            <Link to="#" className="bd-export-link">Export CSV →</Link>
          </div>
          <div className="bd-table">
            <div className="bd-purchase-row bd-purchase-row--head">
              <div>Date</div><div>Format</div><div>Price</div><div>Market Maker</div><div>Status</div><div>Action</div>
            </div>
            {PURCHASES.map((p, i) => (
              <div key={i} className="bd-purchase-row">
                <div className="bd-cell-faint">{p.date}</div>
                <div className="bd-cell-sm">{p.format}</div>
                <div className="text-gold-strong">{p.price}</div>
                <div className="bd-cell-sm2">{p.seller}</div>
                <div className="bd-cell-status">{p.status}</div>
                <div><Link to={p.actionHref} className="bd-action-link">{p.actionLabel}</Link></div>
              </div>
            ))}
          </div>
        </section>

        <section className="bd-section">
          <h2 className="bd-h2">Favorites</h2>
          <div className="bd-fav-grid">
            {FAVORITES.map((f, i) => (
              <Link to="/marketplace" key={i} className="bd-fav-card">
                <div className="bd-fav-thumb" />
                <div className="bd-fav-body">
                  <p className="bd-fav-format">{f.format}</p>
                  <p className="bd-fav-cat">{f.category}</p>
                  <p className="bd-fav-price">{f.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bd-section">
          <h2 className="bd-h2" style={{ marginBottom: 4 }}>Recommended for You</h2>
          <p className="bd-rec-sub">Ranked by your <Link to="#">CAT-LOC-VAL preferences</Link>.</p>
          <div className="bd-rec-grid">
            {RECOMMENDATIONS.map((r, i) => (
              <Link to="/marketplace" key={i} className="bd-rec-card">
                <p className="bd-rec-meta">{r.format} · {r.bidCount} bids</p>
                <p className="bd-rec-cat">{r.category}</p>
                <p className="bd-rec-price">{r.price}</p>
                {r.isMatch && <span className="bd-match-badge">✓ Matches your preferences</span>}
              </Link>
            ))}
          </div>
        </section>

        <section className="bd-account">
          <h3 className="bd-account-title">Account</h3>
          <div className="bd-quick">
            {QUICK_LINKS.map(([label, to]) => (
              <Link key={label} to={to} className="bd-quick-link">{label}</Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
