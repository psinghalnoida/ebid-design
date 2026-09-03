import { useState } from 'react';
import { Link } from 'react-router-dom';
import LightDashboardHeader from '../../components/LightDashboardHeader.jsx';
import './Profile.css';

const CTAS = [{ label: 'Log Out', to: '/' }];

const KYC_MAP = {
  verified: { label: 'Verified', color: 'var(--color-success)', bg: 'var(--color-success-bg)', hint: 'Your identity is fully verified. No action needed.' },
  pending: { label: 'Pending', color: 'var(--color-warning)', bg: 'var(--color-warning-bg)', hint: "Your dossier is with your TSX Master for review — usually 1–2 business days." },
  suspended: { label: 'Suspended', color: 'var(--color-danger)', bg: 'var(--color-danger-bg)', hint: 'A compliance flag needs your attention before you can bid or list again.' },
};

const PROFILE_LINKS = [
  { title: 'Personal Details', subtitle: 'Name, mobile, email', href: '#' },
  { title: 'Preferences', subtitle: 'Categories, notifications', href: '/preferences' },
  { title: 'Invoices', subtitle: 'GST invoices & receipts', href: '#' },
  { title: 'Change mPIN', subtitle: 'Update login PIN via OTP', href: '#' },
  { title: 'Delete Account', subtitle: '30-day grace period', href: '#' },
  { title: 'Saved Searches', subtitle: 'Filters saved from Marketplace', href: '#' },
  { title: 'Payout Bank', subtitle: 'Bank account for settlements', href: '#' },
  { title: 'Rating History', subtitle: 'Trader★ / Market Maker★ ledger', href: '#' },
  { title: 'Activity Log', subtitle: 'Sessions, device & location', href: '#' },
  { title: 'Buyer Dashboard', subtitle: 'Bids, offers, purchases', href: '/buyer/dashboard' },
  { title: 'Market Maker Dashboard', subtitle: 'Lots, sales, earnings', href: '/seller/dashboard' },
];

export default function Profile() {
  const [userName] = useState('Ravi Kumar');
  const [kycStatus] = useState('verified');
  const userInitials = userName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const kyc = KYC_MAP[kycStatus] || KYC_MAP.verified;

  return (
    <div className="pf-page">
      <LightDashboardHeader ctas={CTAS} />
      <main className="pf-main">
        <div className="pf-identity">
          <div className="pf-avatar">{userInitials}</div>
          <div>
            <h1 className="pf-name">{userName}</h1>
            <p className="pf-meta">+91 98765 43210 · Member since Feb 2025</p>
          </div>
        </div>

        <Link to="#" className="pf-kyc-card">
          <div className="pf-kyc-row">
            <div>
              <p className="pf-kyc-eyebrow">Identity Verification</p>
              <div className="pf-kyc-title-row">
                <span className="pf-kyc-title">KYC Compliance</span>
                <span className="pf-kyc-badge" style={{ color: kyc.color, background: kyc.bg }}>{kyc.label}</span>
              </div>
              <p className="pf-kyc-hint">{kyc.hint}</p>
            </div>
            <span className="pf-kyc-arrow">→</span>
          </div>
        </Link>

        <div className="pf-grid">
          {PROFILE_LINKS.map((l) => (
            <Link to={l.href} key={l.title} className="pf-link-card">
              <p className="pf-link-title">{l.title}</p>
              <p className="pf-link-subtitle">{l.subtitle}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
