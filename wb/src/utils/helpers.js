export const formatCurrency = (value, symbol = '₹') => {
  if (value == null || value === '') return '-';
  const n = Number(value);
  if (Number.isNaN(n)) return `${symbol}${value}`;
  return `${symbol}${n.toLocaleString()}`;
};

export const formatDate = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
};

export const sleep = (ms = 0) => new Promise((res) => setTimeout(res, ms));

export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const getTokenFromStorage = () =>
  localStorage.getItem('token') || localStorage.getItem('jwt') || localStorage.getItem('authToken');

export const parseJwt = (token) => {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};

export default {
  formatCurrency,
  formatDate,
  sleep,
  classNames,
  getTokenFromStorage,
  parseJwt,
};
