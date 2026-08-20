import { useEffect, useState } from 'react';
import { fetchPublishedPost, fetchPublishedPosts } from '../lib/api';
import { getPostBySlug, posts as staticPosts } from '../data/posts';

export function usePublishedPosts() {
  const [state, setState] = useState({ posts: [], loading: true, fromApi: false });

  useEffect(() => {
    let cancelled = false;
    fetchPublishedPosts(staticPosts).then((result) => {
      if (!cancelled) setState({ ...result, loading: false });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function usePublishedPost(slug) {
  const [state, setState] = useState({ post: null, loading: true });

  useEffect(() => {
    let cancelled = false;
    if (!slug) {
      setState({ post: null, loading: false });
      return undefined;
    }

    setState({ post: null, loading: true });
    fetchPublishedPost(slug, getPostBySlug(slug)).then((post) => {
      if (!cancelled) setState({ post, loading: false });
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
}
