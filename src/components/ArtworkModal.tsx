import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { Artwork } from '../types/art';

/**
 * Props για το ArtworkModal Component
 */
interface ArtworkModalProps {
  artwork: Artwork | null;                     // Το τρέχον επιλεγμένο έργο (ή null αν είναι κλειστό)
  allArtworks: Artwork[];                      // Ολόκληρη η συλλογή έργων για διαδοχική πλοήγηση
  currentLang: 'el' | 'en';                    // Τρέχουσα επιλεγμένη γλώσσα
  onClose: () => void;                         // Συνάρτηση κλεισίματος του παραθύρου
  onSelectArtwork: (art: Artwork) => void;     // Συνάρτηση αλλαγής επιλεγμένου έργου (Next / Prev)
  onInquire: (art: Artwork) => void;           // Συνάρτηση μεταφοράς στη φόρμα επικοινωνίας
}

/**
 * ArtworkModal Component (Μουσειακό Lightbox Έργου Τέχνης)
 * -------------------------------------------------------------
 * Χαρακτηριστικά & Λειτουργίες:
 * 1. Προβολή έργου σε υψηλή ανάλυση σε σκοτεινό περιβάλλον εστίασης.
 * 2. Πλήκτρα πλοήγησης (Επόμενο / Προηγούμενο) με κυκλική εναλλαγή (loop).
 * 3. Συντομεύσεις πληκτρολογίου:
 *    - Escape: Κλείσιμο παραθύρου.
 *    - Βέλος Δεξιά (ArrowRight): Μετάβαση στο επόμενο έργο.
 *    - Βέλος Αριστερά (ArrowLeft): Μετάβαση στο προηγούμενο έργο.
 * 4. Λειτουργία Μεγέθυνσης (Zoom In / Out 1.5x) για εξέταση των ανάγλυφων υφών.
 * 5. Πλήρης μουσειακή τεκμηρίωση:
 *    - Σειρά, έτος, ακριβείς διαστάσεις, υλικά & τεχνική.
 *    - Επιμελητικό σημείωμα (Curatorial Statement).
 *    - Ιστορικό εκθέσεων (Exhibition Provenance).
 * 6. Κουμπί άμεσης εκδήλωσης ενδιαφέροντος:
 *    - Συμπληρώνει αυτόματα τον τίτλο και το έτος του έργου στη φόρμα επικοινωνίας.
 */
export const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  allArtworks,
  currentLang,
  onClose,
  onSelectArtwork,
  onInquire,
}) => {
  // Κατάσταση μεγέθυνσης εικόνας (zoom 1.5x)
  const [zoomed, setZoomed] = useState(false);

  // Παρακολούθηση πληκτρολογίου για συντομεύσεις προσβασιμότητας (Escape, Βελάκια)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && artwork) handleNext();
      if (e.key === 'ArrowLeft' && artwork) handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artwork, allArtworks]);

  // Αν δεν έχει επιλεγεί έργο, το modal δεν αποδίδεται
  if (!artwork) return null;

  // Εύρεση θέσης του τρέχοντος έργου στη λίστα
  const currentIndex = allArtworks.findIndex((a) => a.id === artwork.id);

  /**
   * Μετάβαση στο επόμενο έργο της συλλογής
   */
  const handleNext = () => {
    if (currentIndex < allArtworks.length - 1) {
      onSelectArtwork(allArtworks[currentIndex + 1]);
      setZoomed(false);
    } else {
      // Επιστροφή στο πρώτο έργο αν βρισκόμαστε στο τέλος
      onSelectArtwork(allArtworks[0]);
      setZoomed(false);
    }
  };

  /**
   * Μετάβαση στο προηγούμενο έργο της συλλογής
   */
  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectArtwork(allArtworks[currentIndex - 1]);
      setZoomed(false);
    } else {
      // Μετάβαση στο τελευταίο έργο αν βρισκόμαστε στην αρχή
      onSelectArtwork(allArtworks[allArtworks.length - 1]);
      setZoomed(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 md:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#FAF9F5] border border-[#2E2E2E] shadow-2xl rounded-2xl flex flex-col lg:flex-row overflow-hidden">
        {/* Κουμπί Κλεισίματος Παραθύρου */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 bg-white/90 hover:bg-white text-[#111111] border border-[#CCCCCC] rounded-full shadow-md transition-colors cursor-pointer"
            title="Κλείσιμο (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Αριστερό Τμήμα: Προβολή Εικόνας Έργου (Media Viewer) */}
        <div className="relative lg:w-7/12 bg-[#121212] flex items-center justify-center p-4 min-h-[280px] sm:min-h-[380px] lg:min-h-[560px] overflow-hidden">
          <img
            src={artwork.imageUrl}
            alt={artwork.title[currentLang]}
            referrerPolicy="no-referrer"
            className={`max-h-[75vh] w-auto max-w-full object-contain transition-transform duration-300 ${
              zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={() => setZoomed(!zoomed)}
          />

          {/* Πλήκτρο Εναλλαγής Μεγέθυνσης (Zoom In / Out) */}
          <button
            onClick={() => setZoomed(!zoomed)}
            className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 hover:bg-black/90 text-white rounded-full text-xs flex items-center gap-1.5 transition-colors border border-white/20 cursor-pointer"
          >
            {zoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline font-mono text-[11px]">
              {zoomed ? (currentLang === 'el' ? 'Σμίκρυνση' : 'Reset') : (currentLang === 'el' ? 'Μεγέθυνση' : 'Zoom')}
            </span>
          </button>

          {/* Βέλη Διαδοχικής Πλοήγησης (Previous & Next) */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
            title="Προηγούμενο"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
            title="Επόμενο"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Δεξί Τμήμα: Μουσειακές Πληροφορίες & Τεκμηρίωση Έργου */}
        <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] lg:max-h-[92vh] bg-[#FAF9F6]">
          <div>
            {/* Σειρά & Αρίθμηση Έργου */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#777777] uppercase tracking-wider mb-2">
              <span>{artwork.series[currentLang]}</span>
              <span className="tabular-nums font-semibold">{currentIndex + 1} / {allArtworks.length}</span>
            </div>

            {/* Τίτλος Έργου */}
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111111] mb-3">
              {artwork.title[currentLang]}
            </h2>

            {/* Πίνακας Τεχνικών Προδιαγραφών */}
            <div className="border-t border-b border-[#E8E4D8] py-3.5 my-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#777777]">{currentLang === 'el' ? 'Έτος Δημιουργίας' : 'Year'}</span>
                <span className="font-mono tabular-nums text-[#111111] font-semibold">{artwork.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777777]">{currentLang === 'el' ? 'Διαστάσεις' : 'Dimensions'}</span>
                <span className="font-mono tabular-nums text-[#111111]">{artwork.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777777]">{currentLang === 'el' ? 'Υλικό & Τεχνική' : 'Medium'}</span>
                <span className="text-[#111111] text-right font-medium max-w-[65%]">{artwork.medium[currentLang]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#777777]">{currentLang === 'el' ? 'Κατάσταση' : 'Status'}</span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    artwork.status === 'available'
                      ? 'text-emerald-800 bg-emerald-50'
                      : artwork.status === 'museum'
                      ? 'text-indigo-800 bg-indigo-50'
                      : 'text-stone-700 bg-stone-100'
                  }`}
                >
                  {artwork.status === 'available'
                    ? (currentLang === 'el' ? 'Διαθέσιμο για απόκτηση' : 'Available for Acquisition')
                    : artwork.status === 'museum'
                    ? (currentLang === 'el' ? 'Συλλογή Μουσείου' : 'Museum Permanent Collection')
                    : (currentLang === 'el' ? 'Ιδιωτική Συλλογή' : 'Private Collection')}
                </span>
              </div>
            </div>

            {/* Επιμελητικό Σημείωμα Έργου */}
            <div className="mb-5">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold mb-1.5">
                {currentLang === 'el' ? 'Καλλιτεχνικό Σημείωμα' : 'Curatorial Concept'}
              </h4>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed font-normal">
                {artwork.description[currentLang]}
              </p>
            </div>

            {/* Ιστορικό Εκθέσεων & Συμμετοχών */}
            {artwork.exhibitionHistory && artwork.exhibitionHistory.length > 0 && (
              <div className="mb-5">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold mb-2">
                  {currentLang === 'el' ? 'Ιστορικό Εκθέσεων' : 'Exhibition Provenance'}
                </h4>
                <ul className="text-xs text-[#555555] space-y-1">
                  {artwork.exhibitionHistory.map((exh, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#888888]">•</span>
                      <span>{exh}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Κουμπί Εκδήλωσης Ενδιαφέροντος */}
          <div className="pt-4 border-t border-[#E8E4D8] mt-4 flex flex-col gap-2">
            <button
              onClick={() => {
                onInquire(artwork);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-wider font-bold transition-colors rounded-full shadow-sm cursor-pointer"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>
                {currentLang === 'el'
                  ? 'Εκδήλωση Ενδιαφέροντος για το Έργο'
                  : 'Inquire About This Piece'}
              </span>
            </button>
            <div className="text-center text-[10px] font-mono text-[#888888]">
              {currentLang === 'el'
                ? 'Εμπιστευτική εξυπηρέτηση συλλεκτών & επιμελητών'
                : 'Private handling for collectors & curators'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
