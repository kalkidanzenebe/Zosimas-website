const API_BASE = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const TOKEN_KEY = 'zosimas_admin_token';

export function apiUrl(path) {
  return `${API_BASE}${path}`;
}

export function mediaUrl(src) {
  if (!src) return src;
  if (/^(https?:|blob:|data:)/i.test(src)) return src;
  const path = src.startsWith('/') ? src : `/${src}`;
  return `${API_BASE}${path}`;
}

function getToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token) {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignore private-mode storage errors.
  }
}

async function parseJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

export async function api(path, options = {}) {
  const { json, headers, ...rest } = options;
  if (!API_BASE && import.meta.env.PROD) {
    throw new Error('API URL is missing. Set VITE_API_URL on Vercel to https://zosimas-website.onrender.com and redeploy.');
  }
  const token = getToken();
  let res;
  try {
    res = await fetch(apiUrl(path), {
      credentials: 'include',
      ...rest,
      headers: {
        ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: json !== undefined ? JSON.stringify(json) : rest.body,
    });
  } catch {
    throw new Error('Cannot reach the API. Wait about a minute for Render to wake, then try again.');
  }
  const data = await parseJson(res);
  if (!res.ok) {
    throw new Error(data.error || 'Request failed.');
  }
  return data;
}

export async function fetchPublishedPosts(fallbackPosts) {
  try {
    const data = await api('/api/posts');
    return { posts: data.posts ?? [], fromApi: true };
  } catch {
    return { posts: fallbackPosts ?? [], fromApi: false };
  }
}

export async function fetchPublishedPost(slug, fallbackPost) {
  try {
    const res = await fetch(apiUrl(`/api/posts/${encodeURIComponent(slug)}`), { credentials: 'include' });
    if (res.status === 404) return null;
    const data = await parseJson(res);
    if (!res.ok) throw new Error(data.error);
    return data.post ?? null;
  } catch {
    return fallbackPost ?? null;
  }
}

export function fetchAdminMe() {
  return api('/api/auth/me');
}

export async function loginAdmin(email, password) {
  const data = await api('/api/auth/login', { method: 'POST', json: { email, password } });
  if (data.token) setToken(data.token);
  return data;
}

export async function logoutAdmin() {
  try {
    await api('/api/auth/logout', { method: 'POST', json: {} });
  } finally {
    setToken(null);
  }
}

export function fetchAdminPosts() {
  return api('/api/admin/posts');
}

export function fetchAdminPost(id) {
  return api(`/api/admin/posts/${encodeURIComponent(id)}`);
}

export function createAdminPost(payload, file) {
  return saveAdminPost('/api/admin/posts', 'POST', payload, file);
}

export function updateAdminPost(id, payload, file) {
  return saveAdminPost(`/api/admin/posts/${encodeURIComponent(id)}`, 'PUT', payload, file);
}

function saveAdminPost(path, method, payload, file) {
  const body = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    body.append(key, typeof value === 'boolean' ? String(value) : String(value));
  });
  if (file) body.append('imageFile', file);
  return api(path, { method, body });
}

export function deleteAdminPost(id) {
  return api(`/api/admin/posts/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
