import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ArtworkModal } from './components/ArtworkModal';
import { VideoSection } from './components/VideoSection';
import { Biography } from './components/Biography';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ClientPitchPanel } from './components/ClientPitchPanel';
import { CmsDemoModal } from './components/CmsDemoModal';
import { ScrollToTop } from './components/ScrollToTop';
import { DeviceProvider, useDevice } from './context/DeviceContext';

// Εισαγωγή αρχικών δεδομένων έργων, βίντεο, προφίλ και εκθέσεων
import {
  initialArtworks,
  initialVideos,
  initialArtistProfile,
  exhibitionsData,
  awardsData,
} from './data/artData';
import { Artwork } from './types/art';

/**
 * Κεντρικό Component της Εφαρμογής (MainApp)
 * ----------------------------------------------------
 * Διαχειρίζεται την καθολική κατάσταση (state) της εφαρμογής:
 * 1. Εναλλαγή γλώσσας (Ελληνικά / English).
 * 2. Συλλογή έργων τέχνης και ενημέρωση από το CMS Demo.
 * 3. Προβολή έργου σε πλήρη οθόνη (Artwork Lightbox Modal).
 * 4. Αυτόματη συμπλήρωση της φόρμας επικοινωνίας για συγκεκριμένο έργο (Inquiry Flow).
 * 5. Άνοιγμα / κλείσιμο των παραθύρων διαλόγου (Πληροφορίες Έργου & CMS Demo).
 * 6. Εναλλαγή προσομοίωσης συσκευών (Desktop / Tablet / Mobile).
 */
function MainApp() {
  // Λήψη κατάστασης λειτουργίας συσκευής από το DeviceContext
  const { deviceMode, setDeviceMode } = useDevice();

  // Γλώσσα περιβάλλοντος ('el' για Ελληνικά, 'en' για Αγγλικά)
  const [currentLang, setCurrentLang] = useState<'el' | 'en'>('el');

  // Λίστα έργων τέχνης (υποστηρίζει ζωντανή προσθήκη και ενημέρωση κατάστασης)
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);

  // Επιλεγμένο έργο για προβολή στο μεγεθυντικό Lightbox
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Επιλεγμένο έργο για άμεση εκδήλωση ενδιαφέροντος στη φόρμα επικοινωνίας
  const [selectedInquiryArtwork, setSelectedInquiryArtwork] = useState<Artwork | null>(null);

  // Κατάσταση εμφάνισης παραθύρου πληροφοριών και αρχιτεκτονικής έργου
  const [isPitchOpen, setIsPitchOpen] = useState(false);

  // Κατάσταση εμφάνισης διαδραστικού πίνακα ελέγχου καλλιτέχνη (CMS Demo)
  const [isCmsOpen, setIsCmsOpen] = useState(false);

  /**
   * Εναλλαγή ενεργής γλώσσας μεταξύ Ελληνικών και Αγγλικών
   */
  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'el' ? 'en' : 'el'));
  };

  /**
   * Ομαλή κύλιση στην ενότητα παρουσίασης έργων (#works)
   */
  const handleExploreWorks = () => {
    const el = document.getElementById('works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Ομαλή κύλιση στην ενότητα οπτικοακουστικού υλικού & studio (#videos)
   */
  const handleOpenVideoReel = () => {
    const el = document.getElementById('videos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Άνοιγμα του κεντρικού έργου του Hero banner σε αναλυτικό Lightbox
   */
  const handleOpenHeroLightbox = () => {
    if (artworks.length > 0) {
      setSelectedArtwork(artworks[0]);
    }
  };

  /**
   * Επιλογή έργου για αγορά / συνεργασία και αυτόματη μεταφορά στη φόρμα επικοινωνίας
   * @param art Το επιλεγμένο έργο τέχνης
   */
  const handleInquireArtwork = (art: Artwork) => {
    setSelectedInquiryArtwork(art);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Προσθήκη νέου έργου τέχνης μέσω του διαδραστικού CMS Demo
   * @param newArt Το νέο έργο που συμπλήρωσε ο χρήστης
   */
  const handleAddArtwork = (newArt: Artwork) => {
    setArtworks((prev) => [newArt, ...prev]);
  };

  /**
   * Ζωντανή αλλαγή κατάστασης διαθεσιμότητας έργου (π.χ. Available, Sold, Museum)
   * @param id Το μοναδικό αναγνωριστικό του έργου
   * @param status Η νέα κατάσταση διαθεσιμότητας
   */
  const handleUpdateArtworkStatus = (id: string, status: Artwork['status']) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === id ? { ...art, status } : art))
    );
  };

  return (
    <>
      {/* 
        Κύριο Πλαίσιο Εφαρμογής:
        Προσαρμόζεται ανάλογα με τη λειτουργία προσομοίωσης:
        - Mobile: max-w-[420px] με στρογγυλεμένες γωνίες και σκιά συσκευής smartphone
        - Tablet: max-w-[820px] με στρογγυλεμένες γωνίες και σκιά συσκευής tablet
        - Desktop: πλήρες πλάτος (100% full width)
      */}
      <div
        className={`min-h-screen bg-[#F8F7F4] text-[#121212] ${
          deviceMode === 'mobile'
            ? 'max-w-[420px] mx-auto my-4 sm:my-6 shadow-2xl border border-[#D5D0C2] rounded-2xl overflow-hidden'
            : deviceMode === 'tablet'
            ? 'max-w-[820px] mx-auto my-4 sm:my-6 shadow-2xl border border-[#D5D0C2] rounded-2xl overflow-hidden'
            : 'w-full'
        }`}
      >
        {/* Ενημερωτική μπάρα επαναφοράς όταν είναι ενεργή η προσομοίωση Mobile ή Tablet */}
        {deviceMode !== 'desktop' && (
          <div className="bg-[#191919] text-white px-4 py-2 text-xs flex items-center justify-between border-b border-[#333333]">
            <span className="font-mono uppercase text-[11px] text-[#E5B54F] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B54F] animate-pulse" />
              {deviceMode === 'mobile' ? 'Mobile Preview (390px - 1 Στήλη)' : 'Tablet Preview (768px - 2 Στήλες)'}
            </span>
            <button
              onClick={() => setDeviceMode('desktop')}
              className="text-[11px] underline text-stone-300 hover:text-white cursor-pointer"
            >
              Επαναφορά σε Desktop (Full Width)
            </button>
          </div>
        )}

        {/* Κύρια Κεφαλίδα Πλοήγησης (Top Bar & Sticky Header) */}
        <Header
          currentLang={currentLang}
          onToggleLang={handleToggleLang}
          onOpenPitch={() => setIsPitchOpen(true)}
          onOpenCms={() => setIsCmsOpen(true)}
        />

        <main>
          {/* Κεντρική Ενότητα Hero: Τυπογραφική ιεραρχία & κεντρικό εικαστικό έκθεμα */}
          <Hero
            currentLang={currentLang}
            onExploreWorks={handleExploreWorks}
            onOpenVideoReel={handleOpenVideoReel}
            onOpenHeroLightbox={handleOpenHeroLightbox}
          />

          {/* Ενότητα Έργων: Κατηγορίες, φίλτρα διαθεσιμότητας, αναζήτηση και πλέγμα */}
          <PortfolioGrid
            artworks={artworks}
            currentLang={currentLang}
            onSelectArtwork={(art) => setSelectedArtwork(art)}
            onInquireArtwork={handleInquireArtwork}
          />

          {/* Ενότητα Κινούμενης Εικόνας: Video Art, Studio Time-lapses & Exhibition Walkthroughs */}
          <VideoSection
            videos={initialVideos}
            currentLang={currentLang}
          />

          {/* Ενότητα Βιογραφικού: Curatorial Statement, χρονολόγιο εκθέσεων & λήψη CV */}
          <Biography
            profile={initialArtistProfile}
            exhibitions={exhibitionsData}
            awards={awardsData}
            currentLang={currentLang}
          />

          {/* Ενότητα Επικοινωνίας: Στοιχεία Atelier, Galleries & Φόρμα Εκδήλωσης Ενδιαφέροντος */}
          <ContactSection
            profile={initialArtistProfile}
            currentLang={currentLang}
            selectedInquiryArtwork={selectedInquiryArtwork}
            onClearSelectedArtwork={() => setSelectedInquiryArtwork(null)}
          />
        </main>

        {/* Υποσέλιδο: Πλοήγηση, Πνευματικά δικαιώματα & Social Media Strip */}
        <Footer currentLang={currentLang} />
      </div>

      {/* Παράθυρο Μεγέθυνσης Έργου (Lightbox Modal με υποστήριξη πληκτρολογίου ESC / Βέλη) */}
      <ArtworkModal
        artwork={selectedArtwork}
        allArtworks={artworks}
        currentLang={currentLang}
        onClose={() => setSelectedArtwork(null)}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
        onInquire={handleInquireArtwork}
      />

      {/* Παράθυρο Πληροφοριών & Προδιαγραφών Έργου (Client Pitch / Project Specifications) */}
      <ClientPitchPanel
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
        onOpenCms={() => setIsCmsOpen(true)}
        currentLang={currentLang}
      />

      {/* Διαδραστικός Πίνακας Ελέγχου Διαχείρισης Περιεχομένου (CMS Demo) */}
      <CmsDemoModal
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        artworks={artworks}
        onAddArtwork={handleAddArtwork}
        onUpdateArtworkStatus={handleUpdateArtworkStatus}
        currentLang={currentLang}
      />

      {/* Επιπλέον Floating Κουμπί Ταχείας Επιστροφής στην Κορυφή (Scroll To Top) */}
      <ScrollToTop currentLang={currentLang} />
    </>
  );
}

/**
 * Ριζικό Component Εφαρμογής
 * Περιβάλλει την εφαρμογή με το DeviceProvider για καθολική διαχείριση διαστάσεων
 */
export default function App() {
  return (
    <DeviceProvider>
      <MainApp />
    </DeviceProvider>
  );
}
