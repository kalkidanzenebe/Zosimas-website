import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, CircleAlert, X } from 'lucide-react';
import { clearNotification } from '../../store/slices/uiSlice';
import { useI18n } from '../../hooks/useI18n';
import { cn } from '../../lib/utils';

export function NotificationToast() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const { t } = useI18n();
  const tone = notification?.type === 'error' ? 'error' : notification?.type === 'success' ? 'success' : 'info';

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
          className={cn(
            'fixed bottom-5 right-5 z-[80] max-w-sm border bg-card px-4 py-3 shadow-[0_12px_40px_rgba(7,27,58,0.12)]',
            tone === 'error' ? 'border-teal' : 'border-line',
          )}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
        >
          <div className="flex items-start gap-3">
            {tone === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
            ) : (
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
            )}
            <p className="text-sm text-ink">{notification.message}</p>
            <button
              type="button"
              aria-label={t('common.dismiss')}
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
