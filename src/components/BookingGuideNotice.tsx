import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export function BookingGuideNotice() {
  const [dismissed, setDismissed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          role="note"
          aria-label="How to complete your transfer request"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-5 bg-[#090909] text-[#FAF9F6] border border-[#C6A66B]/45 px-4 py-3 sm:px-5 sm:py-3.5 shadow-md flex items-start sm:items-center justify-between gap-3 sm:gap-4"
        >
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <span
              className="mt-0.5 sm:mt-0 inline-flex items-center text-[#C6A66B] shrink-0"
              aria-hidden="true"
            >
              <MessageCircle className="w-4 h-4" />
            </span>
            <p className="text-xs sm:text-sm text-[#F4F0E8] leading-relaxed">
              <span className="font-semibold tracking-[0.06em] uppercase text-[#C6A66B]">
                Book below:
              </span>{' '}
              Once the form is completed, select either{' '}
              <span className="font-medium text-[#FAF9F6]">WhatsApp</span> or{' '}
              <span className="font-medium text-[#FAF9F6]">Email</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss booking guidance"
            className="w-8 h-8 -mr-1 inline-flex items-center justify-center border border-[#C6A66B]/25 text-[#D8D0C2] hover:text-[#FAF9F6] hover:border-[#C6A66B] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
