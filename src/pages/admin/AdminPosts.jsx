import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/common/Button';
import { AdminLoading } from '../../components/admin/AdminLoading';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { deleteAdminPost, fetchAdminPosts } from '../../lib/api';
import { showNotification } from '../../store/slices/uiSlice';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { formatDateLabel } from '../../lib/utils';

export default function AdminPosts() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useDocumentMeta({
    title: 'Blog admin | ZOSIMAS',
    description: 'Create and edit ZOSIMAS blog posts.',
  });

  async function loadPosts() {
    setLoading(true);
    try {
      const data = await fetchAdminPosts();
      setPosts(data.posts ?? []);
    } catch (err) {
      dispatch(
        showNotification({
          type: 'error',
          message: err.message || 'Could not load posts.',
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteAdminPost(pendingDelete.id);
      setPosts((current) => current.filter((item) => item.id !== pendingDelete.id));
      dispatch(
        showNotification({
          type: 'success',
          message: `"${pendingDelete.title.en}" was deleted.`,
        }),
      );
      setPendingDelete(null);
    } catch (err) {
      dispatch(
        showNotification({
          type: 'error',
          message: err.message || 'Could not delete that post.',
        }),
      );
    } finally {
      setDeleting(false);
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

        {loading ? (
          <AdminLoading label="Loading posts…" />
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
                          onClick={() => setPendingDelete(post)}
                          className="inline-flex items-center gap-1 font-semibold text-muted hover:text-ink"
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

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this article?"
        description={
          pendingDelete
            ? `“${pendingDelete.title.en}” will be removed from the blog. This cannot be undone.`
            : ''
        }
        confirmLabel="Delete article"
        busy={deleting}
        onCancel={() => {
          if (!deleting) setPendingDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
