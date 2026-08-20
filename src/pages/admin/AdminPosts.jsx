import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/common/Button';
import { deleteAdminPost, fetchAdminPosts } from '../../lib/api';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { formatDateLabel } from '../../lib/utils';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useDocumentMeta({
    title: 'Blog admin | ZOSIMAS',
    description: 'Create and edit ZOSIMAS blog posts.',
  });

  async function loadPosts() {
    setError('');
    try {
      const data = await fetchAdminPosts();
      setPosts(data.posts ?? []);
    } catch (err) {
      setError(err.message || 'Could not load posts.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(post) {
    if (!window.confirm(`Delete “${post.title.en}”? This cannot be undone.`)) return;
    try {
      await deleteAdminPost(post.id);
      setPosts((current) => current.filter((item) => item.id !== post.id));
    } catch (err) {
      setError(err.message || 'Could not delete that post.');
    }
  }

  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Admin</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">Blog posts</h1>
            <p className="mt-2 text-sm text-muted">Create, edit, publish, and remove articles.</p>
          </div>
          <Button to="/admin/posts/new">New post</Button>
        </div>

        {error && <p className="mt-6 text-sm text-ink">{error}</p>}

        {loading ? (
          <p className="mt-10 text-sm text-muted">Loading posts…</p>
        ) : posts.length === 0 ? (
          <p className="mt-10 text-sm text-muted">No posts yet. Create the first article.</p>
        ) : (
          <div className="mt-10 overflow-x-auto border border-line">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t border-line">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-ink">{post.title.en}</p>
                      <p className="mt-1 text-xs text-muted">/{post.slug}</p>
                    </td>
                    <td className="px-4 py-4 text-muted">{post.published ? 'Published' : 'Draft'}</td>
                    <td className="px-4 py-4 text-muted">{formatDateLabel(post.date)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-3">
                        <Link to={`/admin/posts/${post.id}/edit`} className="font-semibold text-teal hover:text-ink">
                          Edit
                        </Link>
                        {post.published && (
                          <Link to={`/blog/${post.slug}`} className="font-semibold text-muted hover:text-ink">
                            View
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDelete(post)}
                          className="font-semibold text-muted hover:text-ink"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </section>
  );
}
