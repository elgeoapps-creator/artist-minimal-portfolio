import React from 'react';
import { ArrowUpRight, Play, Maximize2, MapPin } from 'lucide-react';
import { heroInstallationImg } from '../data/artData';
import { useDevice } from '../context/DeviceContext';

/**
 * Props για το Hero Component
 */
interface HeroProps {
  currentLang: 'el' | 'en';           // Τρέχουσα επιλεγμένη γλώσσα
  onExploreWorks: () => void;         // Συνάρτηση κύλισης στην ενότητα έργων
  onOpenVideoReel: () => void;        // Συνάρτηση κύλισης στην ενότητα βίντεο
  onOpenHeroLightbox: () => void;     // Συνάρτηση ανοίγματος του κεντρικού εκθέματος σε Lightbox
}

/**
 * Hero Component (Κεντρική Ενότητα Αρχικής Σελίδας)
 * -------------------------------------------------------------
 * Υλοποιεί σύγχρονο split-screen σχεδιασμό:
 * 1. Αριστερή Στήλη:
 *    - Κατηγοριοποίηση & έδρα καλλιτέχνη.
 *    - Κεντρικός επιβλητικός τίτλος με σύγχρονη γραμματοσειρά Outfit.
 *    - Καλλιτεχνική δήλωση για τα υλικά (μάρμαρο, χάλυβας, ώχρα, πηλός).
 *    - Κάρτα τρέχουσας έκθεσης με τοποθεσία και ημερομηνίες.
 *    - Κουμπιά άμεσης δράσης (Περιήγηση στα Έργα, Βίντεο Ατελιέ).
 * 2. Δεξιά Στήλη:
 *    - Κεντρική φωτογραφία εικαστικής εγκατάστασης υψηλής ανάλυσης.
 *    - Επικάλυψη στοιχείων έργου (τίτλος, διαστάσεις, μόνιμη συλλογή).
 *    - Πλήκτρο άμεσης μεγέθυνσης σε Fullscreen Lightbox.
 * 3. Κάτω Μπάρα Μετρικών (Key Metrics Strip):
 *    - Έτη πορείας, πλήθος εκθέσεων, μουσειακό αρχείο, εκπροσώπηση γκαλερί.
 */
export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onExploreWorks,
  onOpenVideoReel,
  onOpenHeroLightbox,
}) => {
  // Έλεγχος αν η προβολή είναι σε κινητό
  const { isMobile } = useDevice();

  return (
    <section id="top" className="relative pt-6 sm:pt-10 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-[#E8E6E0] overflow-hidden bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Split Screen Hero Grid: Δύο ισοβαρείς στήλες σε Desktop / Μία στήλη σε Mobile */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14'} items-stretch`}>
          {/* Αριστερή Στήλη: Τυπογραφική ιεραρχία & κείμενο παρουσίασης */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-6'} flex flex-col justify-between py-1`}>
            <div>
              {/* Ετικέτα Έρευνας & Πόλης (Kicker Tag) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFECE5] rounded-full text-[11px] font-mono uppercase tracking-[0.15em] text-[#555555] mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                <span>{currentLang === 'el' ? 'ΣΥΓΧΡΟΝΗ ΕΙΚΑΣΤΙΚΗ ΕΡΕΥΝΑ · ΑΘΗΝΑ' : 'CONTEMPORARY FINE ART · ATHENS'}</span>
              </div>

              {/* Κεντρικός Τίτλος (Main Headline) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-[1.12] text-[#111111] tracking-tight mb-5 text-balance">
                {currentLang === 'el'
                  ? 'Εξερευνώντας τα όρια μεταξύ μνήμης, ύλης και αρχιτεκτονικού κενού.'
                  : 'Exploring boundaries between memory, matter, and spatial void.'}
              </h1>

              {/* Εισαγωγική Καλλιτεχνική Δήλωση */}
              <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed mb-6 sm:mb-8 font-normal max-w-xl">
                {currentLang === 'el'
                  ? 'Μνημειακές γλυπτικές εγκαταστάσεις, ανάγλυφοι καμβάδες και έργα μεικτής τεχνικής από μάρμαρο, οξειδωμένο χάλυβα, ακατέργαστη ώχρα και άψητο πηλό.'
                  : 'Monumental spatial sculptures, tactile mixed-media canvases, and installations forged from Dionysus marble, oxidized steel, and raw minerals.'}
              </p>

              {/* Πλαίσιο Τρέχουσας Έκθεσης (Current Exhibition Highlight) */}
              <div className="p-4 sm:p-5 bg-white border border-[#E2DDCF] rounded-xl mb-6 sm:mb-8 shadow-xs">
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#888888] mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E5B54F]" />
                  <span>{currentLang === 'el' ? 'ΤΡΕΧΟΥΣΑ ΕΚΘΕΣΗ (DEMO)' : 'CURRENT EXHIBITION (DEMO)'}</span>
                </div>
                <div className="text-sm sm:text-base font-display font-semibold text-[#111111]">
                  {currentLang === 'el'
                    ? '«Materia & Silence» — Μουσείο Σύγχρονων Μορφών'
                    : '“Materia & Silence” — Museum of Contemporary Forms'}
                </div>
                <div className="text-xs text-[#666666] mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#888888]" />
                  <span>{currentLang === 'el' ? 'Αθήνα · Διάρκεια έως 15 Νοεμβρίου 2026' : 'Athens · On view through November 15, 2026'}</span>
                </div>
              </div>
            </div>

            {/* Κουμπιά Δράσης (CTA Buttons) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={onExploreWorks}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-[#333333] transition-all rounded-full shadow-md cursor-pointer"
              >
                <span>{currentLang === 'el' ? 'Περιήγηση στα Έργα' : 'Explore Portfolio'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenVideoReel}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#111111] bg-white border border-[#D5D0C2] hover:border-[#111111] hover:bg-[#FAF9F5] transition-all rounded-full shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{currentLang === 'el' ? 'Βίντεο Ατελιέ (0:48)' : 'Watch Studio Reel'}</span>
              </button>
            </div>
          </div>

          {/* Δεξιά Στήλη: Κεντρικό Εικαστικό Έκθεμα & Μεγέθυνση Lightbox */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-6'} flex flex-col`}>
            <div className="relative group overflow-hidden bg-[#ECE8DF] border border-[#DDD6C5] rounded-xl aspect-[4/3] sm:aspect-[16/11] lg:h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] shadow-sm">
              <img
                src={heroInstallationImg}
                alt="Installation Materia & Silence"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
              />

              {/* Διαβαθμισμένη σκίαση για τέλεια ευκρίνεια κειμένου (Scrim Gradient) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

              {/* Επιπλέοντα μεταδεδομένα έργου */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between text-white">
                <div>
                  <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#E0DACE]">
                    {currentLang === 'el' ? 'Επιλεγμένο Έργο Χώρου' : 'Featured Installation'}
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-display font-semibold text-white mt-1">
                    {currentLang === 'el' ? 'Μνήμη του Ασβέστη & Χάλυβας Ι' : 'Memory of Lime & Steel I'}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-300 mt-1 font-mono">
                    <span>2024</span>
                    <span aria-hidden="true">·</span>
                    <span>380 × 260 × 190 cm</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentLang === 'el' ? 'Μόνιμη Συλλογή Μουσείου' : 'Museum Permanent Collection'}</span>
                  </div>
                </div>

                {/* Κουμπί ανοίγματος σε Fullscreen Lightbox */}
                <button
                  onClick={onOpenHeroLightbox}
                  className="p-2 sm:p-2.5 bg-black/50 hover:bg-black/90 backdrop-blur-sm text-white rounded-full border border-white/20 transition-colors shrink-0 cursor-pointer"
                  title={currentLang === 'el' ? 'Μεγέθυνση Έργου' : 'View Fullscreen'}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Λεζάντα αρχείου */}
            <div className="flex justify-between items-center text-[11px] text-[#777777] font-mono mt-2.5 px-1">
              <span>{currentLang === 'el' ? 'Έκθεση Σύγχρονων Μορφών (Αίθουσα 2)' : 'Contemporary Forms Exhibition (Room 2)'}</span>
              <span className="tabular-nums">ARCHIVE-REF-2024</span>
            </div>
          </div>
        </div>

        {/* 
          Κάτω Μπάρα Βασικών Μετρικών (Key Proof Metrics Strip):
          Αναδεικνύει το κύρος και την εμπειρία του καλλιτέχνη
        */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#E8E6E0] grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-3 bg-white/70 border border-[#EAE6DC] rounded-lg">
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#111111] tabular-nums mb-1">
              2008–2026
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">
              {currentLang === 'el' ? 'Χρόνια Εικαστικής Δημιουργίας' : 'Years of Fine Art Practice'}
            </div>
          </div>

          <div className="p-3 bg-white/70 border border-[#EAE6DC] rounded-lg">
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#111111] tabular-nums mb-1">
              14+
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">
              {currentLang === 'el' ? 'Ατομικές & Ομαδικές Εκθέσεις' : 'Solo & Curated Exhibitions'}
            </div>
          </div>

          <div className="p-3 bg-white/70 border border-[#EAE6DC] rounded-lg">
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#111111] mb-1">
              Museum Archive
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">
              {currentLang === 'el' ? 'Μουσειακές Συλλογές' : 'Permanent Collections'}
            </div>
          </div>

          <div className="p-3 bg-white/70 border border-[#EAE6DC] rounded-lg">
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#111111] mb-1">
              Athens · Paris
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">
              {currentLang === 'el' ? 'Εκπροσώπηση Gallery' : 'Gallery Representation'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
