import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { clearNotification } from '../../store/slices/uiSlice';

export function NotificationToast() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (!notification) return undefined;
    const timer = setTimeout(() => dispatch(clearNotification()), 4200);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-[60] max-w-sm border border-line bg-white px-4 py-3 shadow-[0_12px_40px_rgba(7,27,58,0.12)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
        >
          <div className="flex items-start gap-3">
            <p className="text-sm text-navy">{notification.message}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              className="text-muted"
              onClick={() => dispatch(clearNotification())}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
