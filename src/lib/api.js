async function parseJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

export async function api(path, options = {}) {
  const { json, headers, ...rest } = options;
  const res = await fetch(path, {
    credentials: 'include',
    ...rest,
    headers: {
      ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });
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
    const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`, { credentials: 'include' });
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

export function loginAdmin(email, password) {
  return api('/api/auth/login', { method: 'POST', json: { email, password } });
}

export function logoutAdmin() {
  return api('/api/auth/logout', { method: 'POST', json: {} });
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
