import { Link } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader.jsx';
import './CustodianDashboard.css';

const NAV_ITEMS = [
  { label: 'TradeSphereX', to: '/custodian/dashboard#tenants' },
  { label: 'Users', to: '/user-directory' },
  { label: 'Lots', to: '/lot-directory' },
  { label: 'Sessions', to: '/trading-session-directory' },
  { label: 'Compliance', to: '/custodian/dashboard#compliance' },
  { label: 'Dashboard', to: '/custodian/dashboard', active: true },
];
const CTAS = [{ label: 'Screen Flow', to: '/screen-flow' }, { label: 'Log Out', to: '/' }];

const STATS = { tenants: 42, openDisputes: 6, stalledSettlements: 3, openAmlFlags: 2 };
const TODAY = { bidsPlaced: 318, salesClosed: 24, disputesFiled: 2, newByFormat: [{ format: 'EASY', count: 11 }, { format: 'TENDER', count: 3 }] };
const TENANTS = [
  { name: 'Salvage Managers TSX (Company Shop)', tenantClass: 'Tender · Concierge-Only', subdomain: 'salvage-managers', tier: 'CoCo Concierge', href: '/tender-concierge-console' },
  { name: 'Northline Industrial Auctions', tenantClass: 'Industrial', subdomain: 'northline', tier: 'Growth', href: '#' },
  { name: 'Coastal Salvage Co-op', tenantClass: 'Salvage', subdomain: 'coastal-salvage', tier: 'Launch', href: '#' },
  { name: 'Metro Surplus Exchange', tenantClass: 'Surplus', subdomain: 'metro-surplus', tier: 'Starter', href: '#' },
  { name: 'Apex Fleet Disposals', tenantClass: 'Fleet', subdomain: 'apex-fleet', tier: 'Enterprise', href: '#' },
];
const STALLED_AGING = [
  { amount: '₹4,80,000', since: '2026-07-10', daysStalled: 22 },
  { amount: '₹1,15,000', since: '2026-07-24', daysStalled: 8 },
];
const HIGH_VALUE_DISPOSALS = [
  { tenantName: 'Northline Industrial Auctions', format: 'TENDER', finalValue: '₹18,50,000', variance: '+₹2,50,000', date: '2026-07-30' },
  { tenantName: 'Apex Fleet Disposals', format: 'TENDER', finalValue: '₹22,00,000', variance: '+₹1,10,000', date: '2026-07-22' },
  { tenantName: 'Northline Industrial Auctions', format: 'EASY', finalValue: '₹12,40,000', variance: '+₹60,000', date: '2026-07-02' },
];
const STATUS_STYLE = {
  Active: { color: 'var(--color-success)', bg: 'var(--color-success-bg)' },
  'Shadow-banned': { color: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
  Delisted: { color: 'var(--color-danger)', bg: 'var(--color-danger-bg)' },
};
const USERS = [
  { mobile: '98xxxxxx21', name: 'Ravi Kumar', type: 'Individual', kyc: 'Verified', traderRating: '4.6', mmRating: '4.2', status: 'Active' },
  { mobile: '97xxxxxx08', name: 'Priya Singh', type: 'Individual', kyc: 'Verified', traderRating: '3.9', mmRating: '3.2', status: 'Shadow-banned' },
  { mobile: '99xxxxxx44', name: 'Metro Traders LLP', type: 'Business', kyc: 'Verified', traderRating: '2.1', mmRating: '2.1', status: 'Delisted' },
  { mobile: '96xxxxxx77', name: 'Anil Deshmukh', type: 'Individual', kyc: 'Pending', traderRating: '0.0', mmRating: '4.9', status: 'Active' },
];
const COMPLIANCE_LINKS = [
  ['Alerts', '/alerts'], ['Delist Market Maker', '/delist-market-maker'], ['Audit Log', '/audit-ledger'],
  ['Statutory Export', '/statutory-export'], ['Media Waivers', '/media-waivers'], ['AML Monitoring', '/aml-monitoring'],
  ['Payout Reviews', '/payout-reviews'], ['Chargeback Handling', '/chargeback-handling'], ['TradeSphereX Invoices', '/invoices'],
  ['Rating Reviews', '/rating-reviews'], ['Consent Audit', '/consent-audit'], ['Rules & Specifications', '/rules-and-specifications'],
  ['KYC Review Queue', '/kyc-queue'], ['Whitelist TradeSphereX', '/whitelist-tenant'],
];

export default function CustodianDashboard() {
  return (
    <div className="cd-page">
      <DashboardHeader consoleLabel="Custodian Console" homeTo="/" navItems={NAV_ITEMS} ctas={CTAS} />

      <main className="cd-main">
        <h1 className="cd-h1">Custodian Dashboard</h1>
        <p className="cd-sub">Platform-wide oversight — TradeSphereX onboarding, compliance, billing, and governance.</p>

        <div className="cd-stats">
          <Link to="/custodian/dashboard#tenants" className="cd-stat-card"><b>{STATS.tenants}</b><span>Whitelisted TradeSphereX</span></Link>
          <Link to="/dispute-center" className="cd-stat-card"><b>{STATS.openDisputes}</b><span>Open Disputes</span></Link>
          <Link to="#" className="cd-stat-card"><b>{STATS.stalledSettlements}</b><span>Stalled Settlements</span></Link>
          <Link to="/custodian/dashboard#compliance" className="cd-stat-card"><b className="text-gold">{STATS.openAmlFlags}</b><span>Open AML Flags</span></Link>
        </div>

        <section className="cd-section">
          <h2 className="cd-eyebrow">Today</h2>
          <div className="cd-today">
            <div className="cd-today-card"><b>{TODAY.bidsPlaced}</b><span>Bids Placed</span></div>
            <div className="cd-today-card"><b>{TODAY.salesClosed}</b><span>Trading Sessions Closed</span></div>
            <div className="cd-today-card"><b>{TODAY.disputesFiled}</b><span>Disputes Filed</span></div>
            {TODAY.newByFormat.map((lf) => (
              <div key={lf.format} className="cd-today-card"><b>{lf.count}</b><span>New {lf.format} Sessions</span></div>
            ))}
          </div>
        </section>

        <section id="tenants" className="cd-section">
          <div className="cd-section-head">
            <h2 className="cd-h2">TradeSphereX</h2>
            <div className="cd-section-actions">
              <Link to="/trading-session-directory" className="cd-btn">Full Session Directory →</Link>
              <Link to="#" className="cd-btn">+ Whitelist New TradeSphereX</Link>
            </div>
          </div>
          <div className="cd-table">
            <div className="cd-table-row cd-table-row--head cd-tenant-cols">
              <div>Name</div><div>Class</div><div>Subdomain</div><div>CoCo Tier</div>
            </div>
            {TENANTS.map((t) => (
              <Link to={t.href} key={t.name} className="cd-table-row cd-tenant-cols cd-table-row--link">
                <div className="cd-cell-strong">{t.name}</div>
                <div className="cd-cell-muted">{t.tenantClass}</div>
                <div className="cd-cell-mono">{t.subdomain}</div>
                <div>{t.tier}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="cd-section">
          <h2 className="cd-h2">Stalled Settlements — Aging</h2>
          <div className="cd-table">
            {STALLED_AGING.map((s) => (
              <Link to="#" key={s.since} className="cd-stalled-row">
                <span className="text-gold-strong">{s.amount}</span>
                <span className="cd-cell-faint">since {s.since} · {s.daysStalled} days stalled</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="cd-section">
          <div className="cd-section-head">
            <h2 className="cd-h2">High-Value Disposal Records (&gt;₹10L, platform-wide)</h2>
            <Link to="/lot-directory" className="cd-btn">Full Lot Directory →</Link>
          </div>
          <div className="cd-table">
            <div className="cd-table-row cd-table-row--head cd-disposal-cols">
              <div>TradeSphereX</div><div>Format</div><div>Final Value</div><div>Variance</div><div>Date</div>
            </div>
            {HIGH_VALUE_DISPOSALS.map((d, i) => (
              <div key={i} className="cd-table-row cd-disposal-cols">
                <div className="cd-cell-strong">{d.tenantName}</div>
                <div className="cd-cell-muted">{d.format}</div>
                <div className="text-gold-strong">{d.finalValue}</div>
                <div>{d.variance}</div>
                <div className="cd-cell-faint">{d.date}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="users" className="cd-section">
          <div className="cd-section-head">
            <h2 className="cd-h2">Users</h2>
            <Link to="/user-directory" className="cd-btn">Full User Directory →</Link>
          </div>
          <div className="cd-table">
            <div className="cd-table-row cd-table-row--head cd-user-cols">
              <div>Mobile</div><div>Name</div><div>Type</div><div>KYC</div><div>Trader★</div><div>MM★</div><div>Status</div>
            </div>
            {USERS.map((u) => {
              const st = STATUS_STYLE[u.status];
              return (
                <Link to="/user-directory" key={u.mobile} className="cd-table-row cd-table-row--link cd-user-cols">
                  <div className="cd-cell-mono-sm">{u.mobile}</div>
                  <div className="cd-cell-name">{u.name}</div>
                  <div className="cd-cell-muted">{u.type}</div>
                  <div className="cd-cell-faint-sm">{u.kyc}</div>
                  <div>{u.traderRating}★</div>
                  <div>{u.mmRating}★</div>
                  <div><span className="cd-status-badge" style={{ color: st.color, background: st.bg }}>{u.status}</span></div>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="compliance" className="cd-compliance">
          <h3 className="cd-compliance-title">Governance &amp; Compliance</h3>
          <div className="cd-quick">
            {COMPLIANCE_LINKS.map(([label, to]) => (
              <Link key={label} to={to} className="cd-quick-link">{label}</Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
