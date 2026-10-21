import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Props για το ScrollToTop Component
 */
interface ScrollToTopProps {
  currentLang: 'el' | 'en';     // Τρέχουσα επιλεγμένη γλώσσα για προσβασιμότητα (aria-label)
}

/**
 * ScrollToTop Component (Επιπλέον Κουμπί Επαναφοράς στην Κορυφή)
 * -------------------------------------------------------------
 * Χαρακτηριστικά & Λειτουργία:
 * 1. Τοποθέτηση: Σταθερό στην κάτω δεξιά γωνία της οθόνης (`fixed bottom-6 right-6 z-40`).
 * 2. Αισθητική: Ημιδιαφανές σκούρο πλαίσιο με glassmorphism (`bg-black/60 backdrop-blur-md`).
 * 3. Εμφάνιση: Εμφανίζεται αυτόματα μόνο αφού ο χρήστης έχει κυλήσει προς τα κάτω πάνω από 150px.
 * 4. Κύλιση: Εκτελεί απόλυτα ομαλή επαναφορά (`behavior: smooth`) σε `window`, `documentElement` και `body`.
 */
export const ScrollToTop: React.FC<ScrollToTopProps> = ({ currentLang }) => {
  // Κατάσταση ορατότητας του κουμπιού
  const [visible, setVisible] = useState(false);

  // Παρακολούθηση της θέσης κύλισης (Scroll Listener)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollY > 150) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Ομαλή επαναφορά στο (0, 0)
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Αν δεν έχει συμπληρωθεί το όριο κύλισης (150px), δεν αποδίδεται τίποτα
  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label={currentLang === 'el' ? 'Επιστροφή στην κορυφή' : 'Scroll to top'}
      title={currentLang === 'el' ? 'Κορυφή' : 'Top'}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center p-3 bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
    >
      <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};
