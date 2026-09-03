import { useEffect, useState } from 'react';
import { getToken, setToken, onUnauthorized } from '../api/client.js';
import { auth as authApi } from '../api/endpoints.js';

// Auth state backed by the CI4 JWT. The token is the source of truth;
// the cached party record is a convenience for header rendering and is
// refreshed from GET /api/v1/app/auth/me on load.
const USER_KEY = 'adwitix_auth';
const EVENT = 'adwitix-auth-change';

function emit() {
  window.dispatchEvent(new Event(EVENT));
}

export function readAuth() {
  if (!getToken()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && parsed.name ? parsed : null;
  } catch (e) {
    return null;
  }
}

// Normalizes the backend's `party` shape into what the header renders.
export function partyToUser(party) {
  if (!party) return null;
  return {
    id: party.id,
    name: party.full_name || party.mobile_number || 'Account',
    mobile: party.mobile_number || '',
    email: party.email || party.recovery_email || '',
    entityType: party.entity_type || null,
    kycStatus: (party.kyc_status || 'pending').toLowerCase(),
  };
}

// Persists the session from any endpoint that returns { access_token, party }.
export function establishSession(result) {
  if (!result) return null;
  if (result.access_token) setToken(result.access_token);
  const user = partyToUser(result.party) || readAuth();
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  emit();
  return user;
}

// Kept for screens that log in without hitting the API (demo/offline).
export function loginUser(user) {
  const value = {
    name: (user && user.name) || 'Account',
    kycStatus: (user && user.kycStatus) || 'pending',
    mobile: (user && user.mobile) || '',
  };
  localStorage.setItem(USER_KEY, JSON.stringify(value));
  if (!getToken()) setToken('local-session');
  emit();
  return value;
}

export function logoutUser() {
  // JWT logout is client-side only — the backend has no /logout route.
  setToken(null);
  localStorage.removeItem(USER_KEY);
  emit();
}

export function useAuth() {
  const [user, setUser] = useState(readAuth);

  useEffect(() => {
    const sync = () => setUser(readAuth());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    const offUnauthorized = onUnauthorized(() => { logoutUser(); });
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
      offUnauthorized();
    };
  }, []);

  // Refresh the cached party from the server once per mount when a real
  // token is present, so a stale name/KYC status self-corrects.
  useEffect(() => {
    const token = getToken();
    if (!token || token === 'local-session') return;
    authApi.me()
      .then((res) => {
        const fresh = partyToUser(res && res.party);
        if (fresh) { localStorage.setItem(USER_KEY, JSON.stringify(fresh)); emit(); }
      })
      .catch(() => { /* interceptor handles 401; ignore transient failures */ });
  }, []);

  return { user, isLoggedIn: !!user, login: loginUser, logout: logoutUser, establishSession };
}

export function initials(name) {
  return String(name || '')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
