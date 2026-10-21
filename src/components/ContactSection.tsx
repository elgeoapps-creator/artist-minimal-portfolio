import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { ArtistProfile, Artwork } from '../types/art';
import { useDevice } from '../context/DeviceContext';

/**
 * Props για το ContactSection Component
 */
interface ContactSectionProps {
  profile: ArtistProfile;                         // Στοιχεία επικοινωνίας ατελιέ και εκπροσώπησης
  currentLang: 'el' | 'en';                       // Τρέχουσα επιλεγμένη γλώσσα
  selectedInquiryArtwork: Artwork | null;         // Έργο που επιλέχθηκε από το Portfolio ή Lightbox
  onClearSelectedArtwork: () => void;             // Συνάρτηση αφαίρεσης του προεπιλεγμένου έργου
}

/**
 * ContactSection Component (Ενότητα Επικοινωνίας & Εκδήλωσης Ενδιαφέροντος)
 * -------------------------------------------------------------
 * Κύριες λειτουργίες:
 * 1. Αριστερή Στήλη:
 *    - Στοιχεία Atelier (διεύθυνση/έδρα, επίσημο email, τηλέφωνο).
 *    - Επαφές συνεργαζόμενων Galleries σε Αθήνα, Βερολίνο και Παρίσι.
 *    - Minimal Social Media Strip με τα 5 επίσημα logos (Instagram, Facebook, Pinterest, X, TikTok).
 * 2. Δεξιά Στήλη (Φόρμα Επικοινωνίας):
 *    - Αυτόματη συμπλήρωση (pre-fill) τίτλου και έτους όταν ο χρήστης πατά «Ενδιαφέρον» σε κάποιο έργο.
 *    - Επιλογή σκοπού επικοινωνίας (Απόκτηση Έργου, Έκθεση/Επιμέλεια, Επίσκεψη Atelier, Τύπος/Press).
 *    - Έλεγχος εγκυρότητας πεδίων (HTML5 form validation).
 *    - Κατάσταση επιτυχούς υποβολής (Submitted State) με καθαρισμό και δυνατότητα αποστολής νέου μηνύματος.
 */
export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  currentLang,
  selectedInquiryArtwork,
  onClearSelectedArtwork,
}) => {
  // Λήψη κατάστασης συσκευής
  const { isMobile } = useDevice();

  // Δεδομένα φόρμας
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'acquisition',
    artworkTitle: '',
    message: '',
  });

  // Κατάσταση επιτυχούς αποστολής φόρμας
  const [submitted, setSubmitted] = useState(false);

  /**
   * Αυτόματη ενημέρωση του τίτλου έργου όταν ο χρήστης έρχεται από κουμπί ενδιαφέροντος
   */
  useEffect(() => {
    if (selectedInquiryArtwork) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: 'acquisition',
        artworkTitle: `${selectedInquiryArtwork.title[currentLang]} (${selectedInquiryArtwork.year})`,
      }));
    }
  }, [selectedInquiryArtwork, currentLang]);

  /**
   * Χειρισμός υποβολής φόρμας (Form Submit)
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /**
   * Επαναφορά φόρμας σε αρχική κατάσταση
   */
  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'acquisition',
      artworkTitle: '',
      message: '',
    });
    onClearSelectedArtwork();
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#F3EFE7] border-b border-[#E2DDD1]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Επικεφαλίδα Ενότητας Επικοινωνίας */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#D8D2C4] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#777777] mb-2 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span>{currentLang === 'el' ? '04 // ΕΠΙΚΟΙΝΩΝΙΑ & ΕΝΔΙΑΦΕΡΟΝ' : '04 // INQUIRIES & CONTACT'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-[#111111] tracking-tight">
              {currentLang === 'el' ? 'Εκδήλωση Ενδιαφέροντος' : 'Inquiries & Studio Visits'}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#555555] max-w-md font-normal leading-relaxed">
            {currentLang === 'el'
              ? 'Επικοινωνήστε απευθείας με το atelier για πληροφορίες διαθεσιμότητας έργων, επισκέψεις εργαστηρίου και επιμελητικές συνεργασίες.'
              : 'Direct communication with the atelier for artwork acquisition, studio visits, and curatorial collaborations.'}
          </p>
        </div>

        {/* Πλέγμα Πληροφοριών & Φόρμας */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-10' : 'grid-cols-1 lg:grid-cols-12 gap-12'}`}>
          {/* Αριστερή Στήλη: Στοιχεία Atelier, Galleries & Social Media */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-5'} flex flex-col justify-between space-y-8`}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-display font-semibold text-[#111111] mb-2">
                  {currentLang === 'el' ? 'Atelier Αριάδνη Βάλβη' : 'Atelier Ariadne Valvi'}
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  {currentLang === 'el'
                    ? 'Ο χώρος του εργαστηρίου είναι επισκέψιμος για συλλέκτες, αρχιτέκτονες και επιμελητές κατόπιν συνεννόησης.'
                    : 'The studio welcomes private appointments for collectors, architects, and museum curators.'}
                </p>
              </div>

              {/* Στοιχεία Τοποθεσίας, Email & Τηλεφώνου */}
              <div className="space-y-4 text-xs sm:text-sm text-[#333333]">
                <div className="flex items-start gap-3 p-3 bg-white/70 rounded-xl border border-[#E0DCCE]">
                  <MapPin className="w-4 h-4 text-[#777777] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#111111]">{currentLang === 'el' ? 'Έδρα Ατελιέ' : 'Studio Location'}</div>
                    <div className="text-[#666666] text-xs mt-0.5">{profile.studioLocation[currentLang]}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/70 rounded-xl border border-[#E0DCCE]">
                  <Mail className="w-4 h-4 text-[#777777] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#111111]">{currentLang === 'el' ? 'Ηλεκτρονική Αλληλογραφία' : 'Direct Email'}</div>
                    <a href={`mailto:${profile.email}`} className="text-[#111111] hover:underline font-mono text-xs mt-0.5 block">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/70 rounded-xl border border-[#E0DCCE]">
                  <Phone className="w-4 h-4 text-[#777777] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#111111]">{currentLang === 'el' ? 'Τηλέφωνο Επικοινωνίας' : 'Telephone'}</div>
                    <a href={`tel:${profile.phone}`} className="text-[#111111] hover:underline font-mono text-xs mt-0.5 block">
                      {profile.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Επαφές Εκπροσώπησης Gallery */}
              <div className="pt-4 border-t border-[#DCD6C8]">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold mb-3">
                  {currentLang === 'el' ? 'Εκπροσώπηση Gallery' : 'Gallery Contacts'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/75 border border-[#E0DCCE] rounded-lg">
                    <div className="font-semibold text-[#111111]">Contemporary Art Projects</div>
                    <div className="text-[#666666] text-[11px]">Αθήνα · Βερολίνο</div>
                  </div>
                  <div className="p-3 bg-white/75 border border-[#E0DCCE] rounded-lg">
                    <div className="font-semibold text-[#111111]">Galerie Spatial Forms</div>
                    <div className="text-[#666666] text-[11px]">Paris · Marais</div>
                  </div>
                </div>
              </div>

              {/* Επίσημα Social Media Logos */}
              <div className="pt-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold mb-3">
                  {currentLang === 'el' ? 'Social Media' : 'Social Channels'}
                </div>
                <div className="flex items-center gap-5 text-[#222222]">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    title="Instagram"
                    className="p-2 bg-white rounded-full border border-[#DDD6C8] hover:border-[#111111] hover:text-black transition-all hover:scale-110 shadow-xs cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    title="Facebook"
                    className="p-2 bg-white rounded-full border border-[#DDD6C8] hover:border-[#111111] hover:text-black transition-all hover:scale-110 shadow-xs cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03.17-1.4.73-1.4H17.5V2.14c-.65-.09-1.78-.14-2.8-.14-3.5 0-5.7 2.13-5.7 5.9v2.1H6.5v4H9v9.5h5v-9.5z"/>
                    </svg>
                  </a>

                  {/* Pinterest */}
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noreferrer"
                    title="Pinterest"
                    className="p-2 bg-white rounded-full border border-[#DDD6C8] hover:border-[#111111] hover:text-black transition-all hover:scale-110 shadow-xs cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    title="X"
                    className="p-2 bg-white rounded-full border border-[#DDD6C8] hover:border-[#111111] hover:text-black transition-all hover:scale-110 shadow-xs cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    title="TikTok"
                    className="p-2 bg-white rounded-full border border-[#DDD6C8] hover:border-[#111111] hover:text-black transition-all hover:scale-110 shadow-xs cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c-.01 1.76-.56 3.53-1.65 4.88-1.5 1.86-3.87 2.89-6.24 2.72-2.28-.15-4.43-1.4-5.61-3.37-1.45-2.39-1.45-5.59.01-7.98 1.17-1.92 3.25-3.14 5.48-3.35.3-.03.6-.04.9-.04v4.08c-.75.05-1.5.31-2.07.82-.77.67-1.16 1.7-1.07 2.7.07 1 .73 1.89 1.68 2.23 1 .37 2.22.14 2.97-.61.64-.64.95-1.56.93-2.48V.02z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[#777777] font-mono">
              {currentLang === 'el'
                ? 'Απάντηση εντός 24 ωρών από την υπεύθυνη του studio.'
                : 'Direct response within 24 hours.'}
            </div>
          </div>

          {/* Δεξιά Στήλη: Φόρμα Υποβολής Ενδιαφέροντος */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-7'} bg-white border border-[#DDD6C8] p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm`}>
            {/* Οθόνη Επιβεβαίωσης Υποβολής */}
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#111111]">
                  {currentLang === 'el' ? 'Ευχαριστούμε για το ενδιαφέρον σας' : 'Thank you for your inquiry'}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                  {currentLang === 'el'
                    ? `Το μήνυμά σας καταχωρήθηκε με επιτυχία. Θα επικοινωνήσουμε μαζί σας στο ${formData.email} με τον πλήρη φάκελο του έργου.`
                    : `Your inquiry has been received. We will contact you at ${formData.email} with the requested archival documentation.`}
                </p>
                <button
                  onClick={resetForm}
                  className="mt-4 px-6 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#111111] text-white hover:bg-[#333333] transition-colors rounded-full cursor-pointer"
                >
                  {currentLang === 'el' ? 'Αποστολή Νέου Μηνύματος' : 'Send Another Inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Κουτί Επιλεγμένου Έργου (αν έχει προεπιλεγεί) */}
                {selectedInquiryArtwork && (
                  <div className="p-3.5 bg-[#F9F7F1] border border-[#E2DDD0] rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#777777] font-mono text-[10px] uppercase tracking-wider block">
                        {currentLang === 'el' ? 'Επιλεγμένο Έργο:' : 'Selected Piece:'}
                      </span>
                      <span className="font-display font-semibold text-sm text-[#111111]">
                        {selectedInquiryArtwork.title[currentLang]} ({selectedInquiryArtwork.year})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={onClearSelectedArtwork}
                      className="text-[#888888] hover:text-[#111111] underline text-[11px] font-medium cursor-pointer"
                    >
                      {currentLang === 'el' ? 'Αλλαγή' : 'Clear'}
                    </button>
                  </div>
                )}

                {/* Κατηγορία Ενδιαφέροντος (Inquiry Category) */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#666666] font-semibold mb-2">
                    {currentLang === 'el' ? 'Σκοπός Επικοινωνίας' : 'Inquiry Category'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'acquisition', labelEl: 'Απόκτηση Έργου', labelEn: 'Acquisition' },
                      { id: 'curatorial', labelEl: 'Έκθεση / Επιμέλεια', labelEn: 'Exhibition' },
                      { id: 'visit', labelEl: 'Επίσκεψη Atelier', labelEn: 'Studio Visit' },
                      { id: 'press', labelEl: 'Τύπος / Press', labelEn: 'Press' },
                    ].map((type) => (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                        className={`py-2 px-2 text-center rounded-lg text-xs font-medium transition-all truncate cursor-pointer ${
                          formData.inquiryType === type.id
                            ? 'bg-[#111111] text-white shadow-xs'
                            : 'bg-[#F5F2EB] text-[#555555] hover:text-[#111111]'
                        }`}
                      >
                        {currentLang === 'el' ? type.labelEl : type.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Πεδία Ονοματεπωνύμου & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#666666] font-semibold mb-1.5">
                      {currentLang === 'el' ? 'Ονοματεπώνυμο *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={currentLang === 'el' ? 'π.χ. Δημήτρης Παπαδόπουλος' : 'e.g. Elena Rostova'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-[#DDD8CD] focus:border-[#111111] focus:outline-none rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#666666] font-semibold mb-1.5">
                      {currentLang === 'el' ? 'Email Επικοινωνίας *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-[#DDD8CD] focus:border-[#111111] focus:outline-none rounded-lg"
                    />
                  </div>
                </div>

                {/* Πεδία Τηλεφώνου & Τίτλου Έργου */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#666666] font-semibold mb-1.5">
                      {currentLang === 'el' ? 'Τηλέφωνο (Προαιρετικό)' : 'Phone Number (Optional)'}
                    </label>
                    <input
                      type="tel"
                      placeholder="+30 69..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-[#DDD8CD] focus:border-[#111111] focus:outline-none rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#666666] font-semibold mb-1.5">
                      {currentLang === 'el' ? 'Τίτλος Έργου (αν υπάρχει)' : 'Artwork Title'}
                    </label>
                    <input
                      type="text"
                      placeholder={currentLang === 'el' ? 'π.χ. Οργανική Αναδίπλωση #4' : 'e.g. Organic Folding #4'}
                      value={formData.artworkTitle}
                      onChange={(e) => setFormData({ ...formData, artworkTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-[#DDD8CD] focus:border-[#111111] focus:outline-none rounded-lg"
                    />
                  </div>
                </div>

                {/* Πεδίο Μηνύματος */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#666666] font-semibold mb-1.5">
                    {currentLang === 'el' ? 'Μήνυμα / Ειδικές απαιτήσεις *' : 'Message / Details *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={
                      currentLang === 'el'
                        ? 'Γράψτε λεπτομέρειες για το ενδιαφέρον σας, διαστάσεις χώρου ή επιθυμητές ημερομηνίες επίσκεψης...'
                        : 'Please provide details about your collection space, exhibition loan parameters, or preferred studio appointment date...'
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-[#DDD8CD] focus:border-[#111111] focus:outline-none rounded-lg"
                  />
                </div>

                {/* Κουμπί Υποβολής */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-wider bg-[#111111] hover:bg-[#333333] text-white transition-all rounded-full shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{currentLang === 'el' ? 'Αποστολη Εκδηλωσης Ενδιαφεροντος' : 'Submit Direct Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
