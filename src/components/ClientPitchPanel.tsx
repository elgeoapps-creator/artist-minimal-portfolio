import React from 'react';
import { X, Server, Sparkles, SlidersHorizontal } from 'lucide-react';
import { clientPitchPoints } from '../data/artData';

/**
 * Props για το ClientPitchPanel Component
 */
interface ClientPitchPanelProps {
  isOpen: boolean;          // Κατάσταση εμφάνισης παραθύρου
  onClose: () => void;      // Συνάρτηση κλεισίματος παραθύρου
  onOpenCms: () => void;    // Συνάρτηση μετάβασης στο CMS demo
  currentLang: 'el' | 'en'; // Τρέχουσα επιλεγμένη γλώσσα
}

/**
 * ClientPitchPanel Component (Πληροφορίες & Προδιαγραφές Έργου)
 * -------------------------------------------------------------
 * Σκοπός:
 * Παρουσιάζει με δομημένο, επαγγελματικό τρόπο τις τεχνικές και σχεδιαστικές
 * προδιαγραφές ενός σύγχρονου portfolio εικαστικού καλλιτέχνη:
 * 
 * 1. Εισαγωγική Δήλωση Προδιαγραφών (Overview Statement).
 * 2. 5 Βασικοί Σχεδιαστικοί Πυλώνες:
 *    - 01. Μοντέρνος & Minimal Σχεδιασμός με έμφαση στα έργα.
 *    - 02. Ενσωμάτωση Video Art & Studio Reels χωρίς επιβάρυνση ταχύτητας.
 *    - 03. Ολοκληρωμένο CV & Άμεση Φόρμα Εκδήλωσης Ενδιαφέροντος.
 *    - 04. Πλήρης Προσαρμογή για Όλες τις Συσκευές (Responsive Design).
 *    - 05. Εύκολη Διαχείριση Περιεχομένου (CMS).
 * 3. Πλαίσιο Συμβατότητας Hosting & Domain:
 *    - Επεξήγηση ότι ο σχεδιασμός είναι 100% συμβατός με οποιονδήποτε υπάρχοντα server
 *      (cPanel, Apache, Nginx, Vercel, WordPress) χωρίς downtime ή αλλαγή παρόχου.
 * 4. Πλήκτρο Άμεσης Μετάβασης στο CMS Demo.
 */
export const ClientPitchPanel: React.FC<ClientPitchPanelProps> = ({
  isOpen,
  onClose,
  onOpenCms,
  currentLang,
}) => {
  // Αν το παράθυρο είναι κλειστό, δεν αποδίδεται
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 
        Πλαίσιο Παραθύρου:
        - Ύψος h-[88vh] & max-h-[88vh] για ομαλό scrolling σε tablets
        - e.stopPropagation() για αποτροπή κλεισίματος κατά το κλικ στο περιεχόμενο
      */}
      <div 
        className="relative w-full max-w-4xl bg-[#FAF9F5] border border-[#2E2E2E] shadow-2xl rounded-2xl flex flex-col h-[88vh] max-h-[88vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Επικεφαλίδα Παραθύρου */}
        <div className="p-5 sm:p-6 bg-[#111111] text-white flex items-start justify-between border-b border-[#2A2A2A] shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E5B54F] font-mono mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLang === 'el' ? 'Πληροφορίες & Προδιαγραφές Έργου' : 'Project Specifications & Architecture'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-white">
              {currentLang === 'el'
                ? 'Σχεδιασμός & Ανάπτυξη Portfolio Εικαστικού Καλλιτέχνη'
                : 'Visual Artist Portfolio Design & Architecture'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Κυλιόμενο Σώμα Παραθύρου (Scrollable Modal Body) */}
        <div
          className="p-5 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 flex-1 min-h-0 overscroll-contain touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch' }}
          tabIndex={0}
        >
          {/* Συνοπτική Περιγραφή Έργου */}
          <div className="p-4 sm:p-5 bg-white border border-[#E5DFD2] rounded-xl text-xs sm:text-sm text-[#444444] leading-relaxed">
            <p>
              {currentLang === 'el'
                ? 'Ένα σύγχρονο, minimal και καλαίσθητο ψηφιακό portfolio υψηλών προδιαγραφών, εστιασμένο στην ανάδειξη των έργων τέχνης, την ενσωμάτωση οπτικοακουστικού υλικού και την απρόσκοπτη επικοινωνία με συλλέκτες και πολιτιστικούς φορείς.'
                : 'A contemporary, refined digital portfolio focused on prominent artwork presentation, moving image integration, and seamless communication with collectors and curators.'}
            </p>
          </div>

          {/* Βασικοί Πυλώνες & Προδιαγραφές */}
          <div>
            <h3 className="text-base font-display font-semibold text-[#111111] mb-4">
              {currentLang === 'el' ? 'Βασικοί Πυλώνες & Χαρακτηριστικά Έργου' : 'Key Architecture & Deliverables'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clientPitchPoints.map((point) => (
                <div key={point.num} className="p-4 sm:p-5 bg-white border border-[#E5DFD2] rounded-xl hover:border-[#111111] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#8B6B38] bg-[#F7F2E7] px-2 py-0.5 rounded-full">
                      {point.num}
                    </span>
                    <h4 className="text-xs sm:text-sm font-display font-semibold text-[#111111]">
                      {currentLang === 'el' ? point.titleEl : point.titleEn}
                    </h4>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed font-normal">
                    {currentLang === 'el' ? point.descEl : point.descEn}
                  </p>
                </div>
              ))}

              {/* Πλαίσιο Φιλοξενίας & Συμβατότητας Server */}
              <div className="p-5 bg-[#191919] text-white border border-[#333333] rounded-xl md:col-span-2">
                <div className="flex items-center gap-2 mb-2 text-[#E5B54F]">
                  <Server className="w-4 h-4" />
                  <h4 className="text-xs sm:text-sm font-display font-semibold text-white uppercase tracking-wider">
                    {currentLang === 'el'
                      ? 'Ευελιξία Φιλοξενίας & Συμβατότητα Domain'
                      : 'Hosting Flexibility & Domain Compatibility'}
                  </h4>
                </div>
                <p className="text-xs text-[#CCCCCC] leading-relaxed font-normal">
                  {currentLang === 'el'
                    ? 'Πλήρης συμβατότητα με οποιονδήποτε υπάρχοντα server ή πάροχο φιλοξενίας (cPanel, Apache, Nginx, Netlify, Vercel ή υπάρχον WordPress). Δυνατότητα άμεσης εγκατάστασης χωρίς αλλαγή domain και με μηδενικό downtime.'
                    : 'Full compatibility with any existing server or hosting infrastructure (cPanel, Apache, Nginx, Netlify, Vercel, or WordPress). Zero required registrar migration with lightning performance and zero downtime.'}
                </p>
              </div>
            </div>
          </div>

          {/* Προτροπή για Δοκιμή του CMS Demo */}
          <div className="p-5 bg-[#FAF7F0] border border-[#DDD5C5] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-display font-semibold text-[#111111] mb-0.5">
                {currentLang === 'el' ? 'Δοκιμή Διαχείρισης Περιεχομένου (CMS)' : 'Interactive CMS Preview'}
              </div>
              <div className="text-xs text-[#666666]">
                {currentLang === 'el'
                  ? 'Δείτε στην πράξη πόσο εύκολη είναι η προσθήκη νέων έργων και η ενημέρωση διαθεσιμότητας.'
                  : 'Experience how straightforward it is to add new pieces and update availability.'}
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCms();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#111111] hover:bg-[#333333] text-white rounded-full shrink-0 cursor-pointer shadow-sm transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#E5B54F]" />
              <span>{currentLang === 'el' ? 'Άνοιγμα CMS Demo' : 'Launch CMS Demo'}</span>
            </button>
          </div>
        </div>

        {/* Υποσέλιδο Παραθύρου */}
        <div className="p-4 bg-white border-t border-[#EAE4DC] flex justify-between items-center text-xs shrink-0">
          <span className="text-[#777777] font-mono text-[11px]">
            {currentLang === 'el' ? 'Επισκόπηση Προδιαγραφών' : 'Specifications Overview'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#111111] text-white rounded-full hover:bg-[#333333] transition-colors cursor-pointer"
          >
            {currentLang === 'el' ? 'Επιστροφή στο Portfolio' : 'Back to Portfolio'}
          </button>
        </div>
      </div>
    </div>
  );
};
