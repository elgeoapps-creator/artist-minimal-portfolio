import React from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Props για το Footer Component
 */
interface FooterProps {
  currentLang: 'el' | 'en';     // Τρέχουσα επιλεγμένη γλώσσα
}

/**
 * Footer Component (Υποσέλιδο Ιστοσελίδας)
 * -------------------------------------------------------------
 * Χαρακτηριστικά & Δομή:
 * 1. Επάνω Τμήμα (Top Info Grid):
 *    - Επωνυμία Atelier σε έντονη τυπογραφία και ειδίκευση.
 *    - Γρήγοροι σύνδεσμοι μετάβασης στα κύρια τμήματα (#works, #videos, #bio, #contact).
 *    - Κουμπί επιστροφής στην κορυφή («Κορυφή» / «Back to Top»).
 * 2. Αποκλειστικό Social Media Strip (Ακριβώς σύμφωνα με τη φωτογραφία αναφοράς):
 *    - Λεπτή οριζόντια διαχωριστική γραμμή σε μαύρο φόντο.
 *    - Τα 5 επίσημα logos:
 *      * Instagram
 *      * Facebook (αυτόνομο σύμβολο f)
 *      * Pinterest (σύμβολο P)
 *      * X (𝕏)
 *      * TikTok
 * 3. Κάτω Γραμμή (Bottom Line):
 *    - Πνευματικά δικαιώματα (Copyright) με δυναμικό τρέχον έτος.
 *    - Πιστοποίηση φωτογραφικού αρχείου.
 */
export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  /**
   * Ομαλή επαναφορά στην κορυφή της σελίδας
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Λίστα των 5 επίσημων Social Media logos σε καθαρά SVG διανύσματα
   */
  const socialIcons = [
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03.17-1.4.73-1.4H17.5V2.14c-.65-.09-1.78-.14-2.8-.14-3.5 0-5.7 2.13-5.7 5.9v2.1H6.5v4H9v9.5h5v-9.5z"/>
        </svg>
      )
    },
    {
      name: 'Pinterest',
      url: 'https://pinterest.com',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'X',
      url: 'https://x.com',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c-.01 1.76-.56 3.53-1.65 4.88-1.5 1.86-3.87 2.89-6.24 2.72-2.28-.15-4.43-1.4-5.61-3.37-1.45-2.39-1.45-5.59.01-7.98 1.17-1.92 3.25-3.14 5.48-3.35.3-.03.6-.04.9-.04v4.08c-.75.05-1.5.31-2.07.82-.77.67-1.16 1.7-1.07 2.7.07 1 .73 1.89 1.68 2.23 1 .37 2.22.14 2.97-.61.64-.64.95-1.56.93-2.48V.02z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-[#0A0A0A] text-[#999999] pt-14 pb-12 border-t border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Επάνω Τμήμα: Στοιχεία Atelier & Σύνδεσμοι */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10">
          <div>
            <div className="text-base sm:text-lg font-display text-white tracking-[0.15em] uppercase font-bold mb-1">
              {currentLang === 'el' ? 'ΑΡΙΑΔΝΗ ΒΑΛΒΗ' : 'ARIADNE VALVI'}
            </div>
            <div className="text-xs text-[#888888] font-mono">
              {currentLang === 'el'
                ? 'Εικαστικός Καλλιτέχνης · Γλυπτική, Εγκαταστάσεις & Μεικτή Τεχνική'
                : 'Visual Artist · Sculpture, Spatial Installations & Mixed Media'}
            </div>
          </div>

          {/* Γρήγοροι Σύνδεσμοι Πλοήγησης */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#AAAAAA] uppercase tracking-wider font-mono text-[11px]">
            <a href="#works" className="hover:text-white transition-colors">
              {currentLang === 'el' ? 'Έργα' : 'Works'}
            </a>
            <a href="#videos" className="hover:text-white transition-colors">
              {currentLang === 'el' ? 'Βίντεο' : 'Video Art'}
            </a>
            <a href="#bio" className="hover:text-white transition-colors">
              {currentLang === 'el' ? 'Βιογραφικό' : 'Biography'}
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              {currentLang === 'el' ? 'Επικοινωνία' : 'Inquiries'}
            </a>
          </div>

          {/* Κουμπί Επαναφοράς στην Κορυφή */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#CCCCCC] hover:text-white transition-colors cursor-pointer"
          >
            <span>{currentLang === 'el' ? 'Κορυφή' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 
          Αποκλειστικό Social Media Strip (Ακριβώς σύμφωνα με τη φωτογραφία του χρήστη):
          Λεπτή γραμμή επάνω και τα 5 λευκά logos κεντραρισμένα με ομαλή αιώρηση
        */}
        <div className="border-t border-[#222222] pt-8 pb-8 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-7 sm:gap-9 text-white">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                title={social.name}
                aria-label={social.name}
                className="text-stone-300 hover:text-white transition-all transform hover:scale-115 active:scale-95 cursor-pointer"
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Κάτω Γραμμή Πνευματικών Δικαιωμάτων & Αρχείου */}
        <div className="border-t border-[#1C1C1C] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] gap-3 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} Contemporary Fine Art Atelier. All rights reserved.
          </div>
          <div className="text-center sm:text-right text-[#777777]">
            {currentLang === 'el'
              ? 'Φωτογράφιση έργων: Αρχείο Atelier'
              : 'Photography: Atelier Fine Art Archive'}
          </div>
        </div>
      </div>
    </footer>
  );
};
