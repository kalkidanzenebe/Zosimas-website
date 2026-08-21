import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoaderCircle } from 'lucide-react';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/common/Button';
import { FormInput } from '../../components/forms/FormInput';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { AdminLoading } from '../../components/admin/AdminLoading';
import { createAdminPost, fetchAdminPost, mediaUrl, updateAdminPost } from '../../lib/api';
import { serializeBody, slugify } from '../../lib/postBody';
import { showNotification } from '../../store/slices/uiSlice';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const emptyForm = {
  slug: '',
  titleEn: '',
  titleAm: '',
  excerptEn: '',
  excerptAm: '',
  categoryEn: 'Practice',
  categoryAm: '',
  readTimeEn: '5 min read',
  readTimeAm: '',
  image: '',
  imageAltEn: '',
  imageAltAm: '',
  bodyEn: '',
  bodyAm: '',
  published: false,
  publishedAt: '',
};

function fromPost(post) {
  return {
    slug: post.slug || '',
    titleEn: post.title?.en || '',
    titleAm: post.title?.am || '',
    excerptEn: post.excerpt?.en || '',
    excerptAm: post.excerpt?.am || '',
    categoryEn: post.category?.en || '',
    categoryAm: post.category?.am || '',
    readTimeEn: post.readTime?.en || '',
    readTimeAm: post.readTime?.am || '',
    image: post.image || '',
    imageAltEn: post.imageAlt?.en || '',
    imageAltAm: post.imageAlt?.am || '',
    bodyEn: serializeBody(post.body, 'en'),
    bodyAm: serializeBody(post.body, 'am'),
    published: Boolean(post.published),
    publishedAt: post.date || '',
  };
}

export default function AdminPostForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useDocumentMeta({
    title: isEdit ? 'Edit post | ZOSIMAS' : 'New post | ZOSIMAS',
    description: 'Create or update a ZOSIMAS blog post.',
  });

  useEffect(() => {
    if (!isEdit) return undefined;
    let cancelled = false;
    fetchAdminPost(id)
      .then((data) => {
        if (cancelled) return;
        const next = fromPost(data.post);
        setForm(next);
        setImagePreview(mediaUrl(next.image));
      })
      .catch((err) => {
        if (!cancelled) {
          dispatch(
            showNotification({
              type: 'error',
              message: err.message || 'Could not load this post.',
            }),
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id, isEdit]);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const previewSlug = useMemo(
    () => (slugTouched ? form.slug : slugify(form.titleEn)),
    [form.slug, form.titleEn, slugTouched],
  );

  function updateField(field) {
    return (event) => {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      setForm((current) => ({ ...current, [field]: value }));
    };
  }

  function handleImageFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    dispatch(showNotification({ type: 'success', message: 'Cover image selected.' }));
    setImagePreview((current) => {
      if (current?.startsWith('blob:')) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (!imageFile && !form.image) {
      dispatch(showNotification({ type: 'error', message: 'Upload a cover image or paste an image URL.' }));
      setError('Upload a cover image or paste an image URL.');
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      slug: previewSlug,
    };
    try {
      if (isEdit) {
        await updateAdminPost(id, payload, imageFile);
        dispatch(showNotification({ type: 'success', message: 'Article updated.' }));
      } else {
        await createAdminPost(payload, imageFile);
        dispatch(showNotification({ type: 'success', message: 'Article created.' }));
      }
      navigate('/admin');
    } catch (err) {
      const message = err.message || 'Could not save this post.';
      setError(message);
      dispatch(showNotification({ type: 'error', message }));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="py-12">
        <Container>
          <AdminLoading label="Loading post…" />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12">
      <Container className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Admin</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">{isEdit ? 'Edit post' : 'New post'}</h1>
        <p className="mt-2 text-sm text-muted">
          Separate paragraphs with a blank line. Start a line with <code className="text-ink">##</code> for a heading.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput id="titleEn" label="Title (English)" value={form.titleEn} onChange={updateField('titleEn')} required />
            <FormInput id="titleAm" label="Title (Amharic)" value={form.titleAm} onChange={updateField('titleAm')} />
            <FormInput
              id="slug"
              label="URL slug"
              value={previewSlug}
              onChange={(event) => {
                setSlugTouched(true);
                setForm((current) => ({ ...current, slug: event.target.value }));
              }}
              placeholder="connected-systems"
            />
            <FormInput
              id="publishedAt"
              label="Published date"
              type="date"
              value={form.publishedAt}
              onChange={updateField('publishedAt')}
            />
            <label className="flex items-center gap-3 text-sm font-medium text-ink md:mt-8">
              <input
                type="checkbox"
                checked={form.published}
                onChange={updateField('published')}
                className="h-4 w-4 accent-teal"
              />
              Publish on the public blog
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormTextarea id="excerptEn" label="Excerpt (English)" value={form.excerptEn} onChange={updateField('excerptEn')} required rows={4} />
            <FormTextarea id="excerptAm" label="Excerpt (Amharic)" value={form.excerptAm} onChange={updateField('excerptAm')} rows={4} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormInput id="categoryEn" label="Category (English)" value={form.categoryEn} onChange={updateField('categoryEn')} />
            <FormInput id="categoryAm" label="Category (Amharic)" value={form.categoryAm} onChange={updateField('categoryAm')} />
            <FormInput id="readTimeEn" label="Read time (English)" value={form.readTimeEn} onChange={updateField('readTimeEn')} />
            <FormInput id="readTimeAm" label="Read time (Amharic)" value={form.readTimeAm} onChange={updateField('readTimeAm')} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="imageFile" className="text-sm font-medium text-ink">
                Cover image
                <span className="text-teal"> *</span>
              </label>
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageFile}
                className="border border-line bg-card px-3 py-3 text-sm text-ink file:mr-4 file:border-0 file:bg-navy file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white dark:file:bg-white dark:file:text-navy"
              />
              <p className="text-xs text-muted">JPG, PNG, WebP, or GIF. Max 5MB.</p>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt=""
                  className="mt-2 max-h-56 w-full border border-line object-cover"
                />
              ) : null}
            </div>
            <FormInput
              id="image"
              label="Or paste an image URL"
              value={form.image}
              onChange={(event) => {
                setForm((current) => ({ ...current, image: event.target.value }));
                if (!imageFile) setImagePreview(mediaUrl(event.target.value) || event.target.value);
              }}
              placeholder="https://"
            />
            <FormInput id="imageAltEn" label="Image alt (English)" value={form.imageAltEn} onChange={updateField('imageAltEn')} />
            <FormInput id="imageAltAm" label="Image alt (Amharic)" value={form.imageAltAm} onChange={updateField('imageAltAm')} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormTextarea
              id="bodyEn"
              label="Body (English)"
              value={form.bodyEn}
              onChange={updateField('bodyEn')}
              required
              rows={12}
              placeholder={'Opening paragraph.\n\n## Heading\n\nNext paragraph.'}
            />
            <FormTextarea
              id="bodyAm"
              label="Body (Amharic)"
              value={form.bodyAm}
              onChange={updateField('bodyAm')}
              rows={12}
            />
          </div>

          {error && <p className="text-sm text-ink">{error}</p>}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Saving…
                </span>
              ) : isEdit ? (
                'Save changes'
              ) : (
                'Create post'
              )}
            </Button>
            <Button to="/admin" variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}
