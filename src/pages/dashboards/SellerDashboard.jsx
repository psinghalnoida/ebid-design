import { Link } from 'react-router-dom';
import LightDashboardHeader from '../../components/LightDashboardHeader.jsx';
import './SellerDashboard.css';

const NAV_ITEMS = [
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Browse', to: '/lot-directory' },
  { label: 'Market Maker Dashboard', to: '/seller/dashboard', active: true },
  { label: 'Trust & Support', to: '/trust-and-support' },
];
const CTAS = [{ label: 'Profile', to: '/profile' }, { label: 'Log Out', to: '/' }];
const PRIMARY_CTA = { label: 'List an Asset', to: '/create-lot' };

const TENANT_NAME = 'Northline Industrial Auctions';
const STATS = { activeListings: 7, pendingApproval: 2, thisMonthSales: 4, netEarnings: '₹18,42,000' };

const live = { status: 'Live', statusColor: 'var(--color-success)', statusBg: 'var(--color-success-bg)' };
const pendingReview = { status: 'Pending Review', statusColor: 'var(--color-warning)', statusBg: 'var(--color-warning-bg)' };
const closed = (label) => ({ status: label, statusColor: 'var(--color-text-faint)', statusBg: '#F1F2ED' });

const LISTINGS = [
  { category: 'CNC Lathe (Surplus)', format: 'EASY', price: '₹3,42,000', ...live },
  { category: 'Repossessed Excavator', format: 'TENDER', price: '₹18,50,000', ...pendingReview },
  { category: 'Office IT Assets Lot', format: 'BUY_NOW', price: '₹95,000', ...live },
  { category: 'Steel Coil Surplus', format: 'EXPRESS', price: '₹4,40,000', ...closed('Sold') },
];
const SALES = [
  { date: '2026-07-18', format: 'EASY', price: '₹3,10,000', fee: '₹9,300', tds: '₹31,000', buyer: '98xxxxxx21', status: 'Completed' },
  { date: '2026-07-02', format: 'TENDER', price: '₹12,40,000', fee: '₹37,200', tds: '₹1,24,000', buyer: '97xxxxxx08', status: 'Completed' },
  { date: '2026-06-25', format: 'EXPRESS', price: '₹1,15,000', fee: '₹3,450', tds: '₹11,500', buyer: '99xxxxxx44', status: 'Pending' },
];
const THIS_MONTH = { saleCount: 4, totalSales: '₹19,65,000', totalFees: '₹58,950', totalTds: '₹1,96,500' };
const YTD = { saleCount: 21, netEarnings: '₹1,42,80,000', pendingCount: 2 };
const PAYOUT_ACCOUNT = '····4821 (HDFC0001234)';
const PAYOUT_PENDING = true;
const PAYOUT_ACTIVATES_AT = 'Aug 4, 2026';
const APPLICATIONS = [
  { tenantName: 'Coastal Salvage Co-op', status: 'Approved', statusColor: 'var(--color-success)', statusBg: 'var(--color-success-bg)' },
  { tenantName: 'Metro Surplus Exchange', status: 'Pending', statusColor: 'var(--color-warning)', statusBg: 'var(--color-warning-bg)' },
];
const QUICK_LINKS = [
  ['Profile', '/profile'], ['KYC', '#'], ['Invoices', '#'], ['Payout Bank', '#'], ['Apply to Sell Elsewhere', '/apply-to-sell'],
];

export default function SellerDashboard() {
  return (
    <div className="sd-page">
      <LightDashboardHeader navItems={NAV_ITEMS} ctas={CTAS} primaryCta={PRIMARY_CTA} />
      <main className="sd-main">
        <div className="sd-title-row">
          <h1 className="sd-h1">Market Maker Dashboard — {TENANT_NAME}</h1>
          <span className="sd-standing-badge">Standing: Good</span>
        </div>
        <p className="sd-sub">Your standing here reflects activity on {TENANT_NAME} only — it doesn't carry over to any other TradeSphereX.</p>

        <div className="sd-stats">
          <div className="sd-stat-card"><b>{STATS.activeListings}</b><span>Active Listings</span></div>
          <div className="sd-stat-card"><b>{STATS.pendingApproval}</b><span>Pending Approval</span></div>
          <div className="sd-stat-card"><b className="text-gold">{STATS.thisMonthSales}</b><span>Sales This Month</span></div>
          <div className="sd-stat-card"><b>{STATS.netEarnings}</b><span>Net Received YTD</span></div>
        </div>

        <section className="sd-section">
          <div className="sd-section-head">
            <h2 className="sd-h2">My Lots</h2>
            <div className="sd-head-links">
              <Link to="/lot-reach-and-interest" className="sd-pill-link">Lot Reach & Interest</Link>
              <Link to="/create-lot" className="sd-pill-link">+ Create Lot</Link>
            </div>
          </div>
          <div className="sd-table">
            {LISTINGS.map((l, i) => (
              <Link to="#" key={i} className="sd-listing-row">
                <span><span className="sd-listing-cat">{l.category}</span><span className="sd-listing-format">{l.format}</span></span>
                <span className="sd-listing-right">
                  <span className="sd-listing-price">{l.price}</span>
                  <span className="sd-badge" style={{ color: l.statusColor, background: l.statusBg }}>{l.status}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="sd-section">
          <div className="sd-section-head">
            <h2 className="sd-h2">My Sales</h2>
            <Link to="#" className="sd-export-link">Export CSV →</Link>
          </div>
          <div className="sd-table">
            <div className="sd-sales-row sd-sales-row--head">
              <div>Date</div><div>Format</div><div>Price</div><div>Fee</div><div>TDS</div><div>Trader</div><div>Status</div><div>Chronicle</div>
            </div>
            {SALES.map((s, i) => (
              <div key={i} className="sd-sales-row">
                <div className="sd-cell-faint">{s.date}</div>
                <div className="sd-cell-sm">{s.format}</div>
                <div className="sd-cell-gold">{s.price}</div>
                <div className="sd-cell-sm">{s.fee}</div>
                <div className="sd-cell-sm">{s.tds}</div>
                <div className="sd-cell-buyer">{s.buyer}</div>
                <div><Link to="#" className="sd-status-link">{s.status}</Link></div>
                <div><Link to="#" className="sd-action-link">View →</Link></div>
              </div>
            ))}
          </div>
        </section>

        <section className="sd-section">
          <h2 className="sd-h2">Earnings Summary</h2>
          <p className="sd-eyebrow">This Month</p>
          <div className="sd-earn-grid">
            <div className="sd-earn-card"><b>{THIS_MONTH.saleCount}</b><span>Sales</span></div>
            <div className="sd-earn-card"><b>{THIS_MONTH.totalSales}</b><span>Total Sales</span></div>
            <div className="sd-earn-card"><b>{THIS_MONTH.totalFees}</b><span>Fees Paid</span></div>
            <div className="sd-earn-card"><b>{THIS_MONTH.totalTds}</b><span>TDS Deducted</span></div>
          </div>
          <p className="sd-eyebrow">Year to Date</p>
          <div className="sd-earn-grid sd-earn-grid--3">
            <div className="sd-earn-card"><b>{YTD.saleCount}</b><span>Sales</span></div>
            <div className="sd-earn-card"><b className="text-gold">{YTD.netEarnings}</b><span>Net Received (after fees + TDS)</span></div>
            <div className="sd-earn-card"><b>{YTD.pendingCount}</b><span>Pending Settlements</span></div>
          </div>
        </section>

        <section className="sd-section">
          <h2 className="sd-h2">Payout Account</h2>
          <div className="sd-payout-card">
            <div>
              <p className="sd-payout-account">{PAYOUT_ACCOUNT}</p>
              {PAYOUT_PENDING && <p className="sd-payout-note">A change is pending — activates {PAYOUT_ACTIVATES_AT} (24-hour cooling-off).</p>}
            </div>
            <Link to="#" className="sd-pill-link">Manage Payout Bank</Link>
          </div>
        </section>

        <section className="sd-section sd-section--tight">
          <h2 className="sd-h2">My Applications — Other TradeSphereX</h2>
          <div className="sd-table">
            {APPLICATIONS.map((a, i) => (
              <div key={i} className="sd-app-row">
                <span>{a.tenantName}</span>
                <span className="sd-badge" style={{ color: a.statusColor, background: a.statusBg }}>{a.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="sd-account">
          <h3 className="sd-account-title">Account</h3>
          <div className="sd-quick">
            {QUICK_LINKS.map(([label, to]) => (
              <Link key={label} to={to} className="sd-quick-link">{label}</Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
