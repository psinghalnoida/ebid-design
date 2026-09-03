import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_GROUPS } from '../nav/siteNav.js';
import { useAuth, initials } from '../utils/auth.js';
import './AppHeader.css';

const KYC_MAP = {
  verified: { label: 'KYC Verified', color: 'var(--color-success)' },
  pending: { label: 'KYC Pending', color: 'var(--color-warning)' },
  suspended: { label: 'KYC Suspended', color: 'var(--color-danger)' },
};

// The single header used across every page.
// `variant`: 'light' (public / self-service) | 'dark' (internal ops consoles)
// `contextNav`: [{ label, to, active }] — page-specific links shown inline on wide viewports
// `contextLabel`: small console/context label beside the logo
// `ctas` / `primaryCta`: extra action links
// `backTo` / `backLabel`: compact back link for legal & document pages
export default function AppHeader({
  variant = 'light',
  homeTo = '/',
  contextLabel,
  contextNav = [],
  ctas = [],
  primaryCta,
  backTo,
  backLabel,
  maxWidth = 1240,
}) {
  const { user, isLoggedIn, logout } = useAuth();
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpenMenu(null);
        setAccountOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpenMenu(null); setAccountOpen(false); setMobileOpen(false); }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, []);

  const kyc = KYC_MAP[(user && user.kycStatus) || 'verified'] || KYC_MAP.verified;
  const groupActive = (g) => g.items.some((it) => it.to === pathname);

  return (
    <header ref={rootRef} className={`ah ah--${variant}`}>
      <div className="ah__inner" style={{ maxWidth }}>
        <Link to={homeTo} className="ah__logo" onClick={() => setMobileOpen(false)}>
          <img src="/adwitix-icon.svg" alt="" className="ah__logo-icon" />
          <span className="ah__wordmark">Adwiti<span className="ah__wordmark-accent">X</span></span>
        </Link>
        {contextLabel && <span className="ah__context-label">{contextLabel}</span>}

        <nav className="ah__nav" aria-label="Primary">
          {NAV_GROUPS.map((g) => {
            const open = openMenu === g.label;
            return (
              <div key={g.label} className="ah__group">
                <button
                  type="button"
                  className={`ah__group-btn${open || groupActive(g) ? ' ah__group-btn--active' : ''}`}
                  aria-expanded={open}
                  onClick={() => setOpenMenu(open ? null : g.label)}
                >
                  {g.label}
                  <span className="ah__caret" aria-hidden="true">▾</span>
                </button>
                {open && (
                  <div className="ah__menu" role="menu">
                    {g.items.map((it) => (
                      <Link key={it.to + it.label} to={it.to} role="menuitem" className={`ah__menu-link${pathname === it.to ? ' ah__menu-link--active' : ''}`}>
                        {it.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {contextNav.length > 0 && (
          <nav className="ah__context-nav" aria-label="Page">
            {contextNav.map((item) => (
              <Link key={item.label + item.to} to={item.to} className={`ah__context-link${item.active ? ' ah__context-link--active' : ''}`}>{item.label}</Link>
            ))}
          </nav>
        )}

        <div className="ah__right">
          {backTo && <Link to={backTo} className="ah__back">← {backLabel || 'Back'}</Link>}
          {ctas.map((cta) => <Link key={cta.label} to={cta.to} className="ah__cta">{cta.label}</Link>)}
          {primaryCta && <Link to={primaryCta.to} className="ah__cta ah__cta--primary">{primaryCta.label}</Link>}

          {isLoggedIn ? (
            <div className="ah__account-wrap">
              <button type="button" className="ah__account" aria-expanded={accountOpen} onClick={() => setAccountOpen(!accountOpen)}>
                <span className="ah__avatar">{initials(user.name)}</span>
                <span className="ah__account-text">
                  <span className="ah__account-name">{user.name}</span>
                  <span className="ah__account-kyc" style={{ color: kyc.color }}>{kyc.label}</span>
                </span>
              </button>
              {accountOpen && (
                <div className="ah__menu ah__menu--right" role="menu">
                  <Link to="/profile" role="menuitem" className="ah__menu-link">Profile</Link>
                  <Link to="/buyer/dashboard" role="menuitem" className="ah__menu-link">My Dashboard</Link>
                  <Link to="/preferences" role="menuitem" className="ah__menu-link">Preferences</Link>
                  <button type="button" role="menuitem" className="ah__menu-link ah__menu-link--danger" onClick={() => { logout(); setAccountOpen(false); }}>Log Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/onboarding" className="ah__login">Log In</Link>
          )}

          <button type="button" className="ah__burger" aria-label="Menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="ah__drawer">
          {contextNav.length > 0 && (
            <div className="ah__drawer-group">
              <div className="ah__drawer-title">This page</div>
              <div className="ah__drawer-links">
                {contextNav.map((item) => <Link key={item.label + item.to} to={item.to} className="ah__drawer-link">{item.label}</Link>)}
              </div>
            </div>
          )}
          {NAV_GROUPS.map((g) => (
            <div key={g.label} className="ah__drawer-group">
              <div className="ah__drawer-title">{g.label}</div>
              <div className="ah__drawer-links">
                {g.items.map((it) => (
                  <Link key={it.to + it.label} to={it.to} className={`ah__drawer-link${pathname === it.to ? ' ah__drawer-link--active' : ''}`}>{it.label}</Link>
                ))}
              </div>
            </div>
          ))}
          <div className="ah__drawer-foot">
            {isLoggedIn ? (
              <button type="button" className="ah__drawer-logout" onClick={logout}>Log Out — {user.name}</button>
            ) : (
              <Link to="/onboarding" className="ah__drawer-login">Log In</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
