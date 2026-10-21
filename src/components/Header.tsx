import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Sparkles, SlidersHorizontal, Smartphone, Monitor, Tablet, ArrowUpRight } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';

/**
 * Props για το Header Component
 */
interface HeaderProps {
  currentLang: 'el' | 'en';     // Τρέχουσα επιλεγμένη γλώσσα
  onToggleLang: () => void;     // Συνάρτηση εναλλαγής γλώσσας
  onOpenPitch: () => void;      // Συνάρτηση ανοίγματος του modal προδιαγραφών έργου
  onOpenCms: () => void;        // Συνάρτηση ανοίγματος του διαδραστικού CMS demo
}

/**
 * Header Component (Κεφαλίδα Ιστοτόπου)
 * -------------------------------------------------------------
 * Περιλαμβάνει δύο κύριες ζώνες:
 * 1. Επάνω Σκούρα Μπάρα Παρουσίασης (Presentation Bar):
 *    - Ένδειξη συμβατότητας με το υπάρχον Hosting & Domain.
 *    - Επιλογέας συσκευής (Desktop / Tablet / Mobile).
 *    - Πλήκτρα ταχείας εκκίνησης CMS Demo και Πληροφοριών Έργου.
 * 2. Sticky Κύρια Κεφαλίδα:
 *    - Λογότυπο / Όνομα καλλιτέχνη σε μοντέρνα τυπογραφία (Zone 1).
 *    - Σύνδεσμοι πλοήγησης για μεγάλα desktops (Zone 2).
 *    - Επιλογέας γλώσσας EN / GR & Hamburger / Action CTA (Zone 3).
 *    - Αναπτυσσόμενο συρτάρι πλοήγησης για Tablet & Mobile.
 */
export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  onOpenPitch,
  onOpenCms,
}) => {
  // Λήψη τρέχουσας συσκευής και συνάρτησης αλλαγής από το Context
  const { deviceMode, setDeviceMode, isMobile, isTablet } = useDevice();

  // Κατάσταση ανοίγματος του mobile/tablet μενού
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Παρακολούθηση κύλισης σελίδας για εφέ blur & λεπτού σκιώδους περιγράμματος
  const [scrolled, setScrolled] = useState(false);

  // Καθορισμός αν πρέπει να χρησιμοποιηθεί compact μενού (σε Mobile ή Tablet)
  const isCompactNav = isMobile || isTablet;

  // Listener κύλισης (Scroll Listener) για δυναμική προσαρμογή του background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Λίστα συνδέσμων πλοήγησης με δίγλωσσες ετικέτες
  const navLinks = [
    { href: '#works', labelEl: 'Έργα', labelEn: 'Selected Works' },
    { href: '#videos', labelEl: 'Βίντεο & Studio', labelEn: 'Motion & Studio' },
    { href: '#bio', labelEl: 'Βιογραφικό', labelEn: 'Biography' },
    { href: '#contact', labelEl: 'Επικοινωνία', labelEn: 'Inquiries' },
  ];

  /**
   * Διαχείριση κλικ σε σύνδεσμο: κλείνει το μενού και εκτελεί ομαλή κύλιση στο τμήμα-στόχο
   */
  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 
        Επάνω Μπάρα Παρουσίασης & Προσομοίωσης (Top Presentation Bar):
        Προσφέρει στον πελάτη τη δυνατότητα να δοκιμάσει άμεσα την απόκριση της σελίδας 
        και να δει το demo διαχείρισης CMS.
      */}
      <div className="bg-[#0F0F0F] text-[#CCCCCC] text-xs py-2 px-3 sm:px-4 border-b border-[#222222] w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
          {/* Αριστερό τμήμα: Τίτλος προσχεδίου & διασφάλιση διατήρησης υπάρχοντος hosting */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B54F] shrink-0" />
            <span className="font-medium text-white tracking-wide text-[11px] sm:text-xs truncate">
              {currentLang === 'el' ? 'Προσχέδιο Ανασχεδιασμού' : 'Redesign Prototype'}
            </span>
            <span className="text-stone-500 hidden md:inline">/</span>
            <span className="text-stone-400 hidden lg:inline text-[11px] truncate">
              {currentLang === 'el' ? 'Συμβατό με το υπάρχον Hosting & Domain σας' : 'Retains existing domain & host'}
            </span>
          </div>

          {/* Δεξί τμήμα: Εναλλαγή συσκευών (Desktop, Tablet, Mobile) & κουμπιά CMS / Πρότασης */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Επιλογέας Viewport προσομοίωσης */}
            <div className="flex items-center bg-[#1F1F1F] rounded p-0.5 border border-[#333333]">
              <button
                onClick={() => setDeviceMode('desktop')}
                title="Desktop View (Full Width)"
                className={`p-1 rounded transition-colors ${
                  deviceMode === 'desktop' ? 'bg-[#333333] text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                title="Tablet View (768px - 820px)"
                className={`p-1 rounded transition-colors ${
                  deviceMode === 'tablet' ? 'bg-[#333333] text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                title="Mobile View (390px - 420px)"
                className={`p-1 rounded transition-colors ${
                  deviceMode === 'mobile' ? 'bg-[#333333] text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Πλήκτρο ανοίγματος του διαδραστικού CMS Demo */}
            <button
              onClick={onOpenCms}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-[#1F1F1F] hover:bg-[#2A2A2A] text-stone-200 border border-[#333333] rounded transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3 text-[#E5B54F]" />
              <span>CMS</span>
            </button>

            {/* Πλήκτρο ανοίγματος πληροφοριών & προδιαγραφών έργου */}
            <button
              onClick={onOpenPitch}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold bg-white hover:bg-stone-100 text-[#111111] rounded transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>{currentLang === 'el' ? 'Πρόταση' : 'Pitch'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 
        Κύρια Κεφαλίδα Ιστοσελίδας (Sticky Navigation Header):
        Παραμένει σταθερή στην κορυφή κατά την κύλιση για εύκολη περιήγηση
      */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#F8F7F4]/95 backdrop-blur-md shadow-xs border-b border-[#E8E6E0]'
            : 'bg-[#F8F7F4] border-b border-[#ECEAE3]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
          {/* Zone 1: Επωνυμία Καλλιτέχνη / Brand Typography */}
          <a
            href="#top"
            className="flex items-baseline gap-2 group whitespace-nowrap shrink-0"
          >
            <span className="text-base sm:text-lg lg:text-xl font-display font-bold tracking-tight text-[#111111] group-hover:opacity-75 transition-opacity">
              {currentLang === 'el' ? 'ΑΡΙΑΔΝΗ ΒΑΛΒΗ' : 'ARIADNE VALVI'}
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans font-light tracking-widest text-[#888888] uppercase hidden sm:inline">
              ATELIER
            </span>
          </a>

          {/* Zone 2: Σύνδεσμοι Πλοήγησης (Εμφανίζονται σε ευρείες οθόνες xl > 1280px) */}
          {!isCompactNav && (
            <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs font-medium uppercase tracking-[0.12em] text-[#555555]">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="hover:text-[#111111] transition-colors whitespace-nowrap py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#111111] hover:after:w-full after:transition-all after:duration-250 cursor-pointer"
                >
                  {currentLang === 'el' ? link.labelEl : link.labelEn}
                </button>
              ))}
            </nav>
          )}

          {/* Zone 3: Επιλογέας Γλώσσας + Κουμπί Εκδήλωσης Ενδιαφέροντος / Hamburger Μενού */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Κουμπί εναλλαγής γλώσσας (EN / GR) */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-[#EFECE6] hover:bg-[#E5E1D8] text-[#222222] transition-colors cursor-pointer shrink-0"
              title={currentLang === 'el' ? 'Switch to English' : 'Αλλαγή σε Ελληνικά'}
            >
              <Globe className="w-3.5 h-3.5 text-[#555555]" />
              <span className="text-[11px] tracking-wider uppercase">{currentLang === 'el' ? 'EN' : 'GR'}</span>
            </button>

            {/* Πλήκτρο Άμεσης Επικοινωνίας (Μόνο σε πολύ ευρεία οθόνη Desktop για αποφυγή overflow) */}
            {!isCompactNav && (
              <button
                onClick={() => handleNavClick('#contact')}
                className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-[#111111] hover:bg-[#2A2A2A] transition-all rounded-full cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{currentLang === 'el' ? 'Εκδηλωση Ενδιαφεροντος' : 'Inquire'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </button>
            )}

            {/* Κουμπί Hamburger (Ενεργοποιείται σε Tablet, Mobile και μικρότερα παράθυρα) */}
            {(isCompactNav || false) && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#111111] hover:bg-[#EAE7DF] rounded-md transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                aria-label="Toggle menu"
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] hidden sm:inline">
                  {mobileMenuOpen ? (currentLang === 'el' ? 'Κλείσιμο' : 'Close') : (currentLang === 'el' ? 'Μενού' : 'Menu')}
                </span>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* 
          Αναπτυσσόμενο Συρτάρι Πλοήγησης (Compact Drawer για Tablet & Mobile):
          Εξασφαλίζει άψογη εμπειρία αφής, καθαρή τυπογραφία και πλήρους πλάτους κουμπί ενδιαφέροντος
        */}
        {isCompactNav && mobileMenuOpen && (
          <div className="bg-[#FAF9F5] border-b border-[#E0DCCE] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
            <div className="text-[11px] uppercase tracking-widest text-[#888888] font-mono">
              {currentLang === 'el' ? 'Πλοηγηση' : 'Navigation'}
            </div>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-base sm:text-lg font-display font-medium text-[#111111] hover:text-[#555555] py-1.5 flex items-center justify-between border-b border-[#EFECE5] cursor-pointer"
                >
                  <span>{currentLang === 'el' ? link.labelEl : link.labelEn}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#888888]" />
                </button>
              ))}
            </nav>

            {/* Πλήρους πλάτους κουμπί εκδήλωσης ενδιαφέροντος μέσα στο συρτάρι */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('#contact')}
                className="w-full text-center py-3 text-xs font-bold tracking-widest uppercase text-white bg-[#111111] rounded-full shadow-md cursor-pointer hover:bg-[#2A2A2A] transition-colors"
              >
                {currentLang === 'el' ? 'Εκδηλωση Ενδιαφεροντος' : 'Inquire / Contact'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
