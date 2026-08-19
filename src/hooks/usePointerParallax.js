import { useCallback, useEffect, useRef, useState } from 'react';

export function usePointerParallax({ enabled = true, strength = 12 } = {}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frame = useRef(0);

  const onMove = useCallback(
    (event) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setOffset({ x: x * strength, y: y * strength });
      });
    },
    [enabled, strength],
  );

  const onLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return { ref, offset, onMove, onLeave };
}
