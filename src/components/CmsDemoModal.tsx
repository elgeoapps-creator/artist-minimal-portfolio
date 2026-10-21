import React, { useState } from 'react';
import { X, Plus, Save, CheckCircle2, Image, Sparkles } from 'lucide-react';
import { Artwork } from '../types/art';

/**
 * Props για το CmsDemoModal Component
 */
interface CmsDemoModalProps {
  isOpen: boolean;                                                              // Κατάσταση εμφάνισης παραθύρου
  onClose: () => void;                                                          // Συνάρτηση κλεισίματος παραθύρου
  artworks: Artwork[];                                                          // Τρέχουσα λίστα έργων
  onAddArtwork: (newArt: Artwork) => void;                                      // Συνάρτηση προσθήκης νέου έργου
  onUpdateArtworkStatus: (id: string, status: Artwork['status']) => void;       // Συνάρτηση ενημέρωσης κατάστασης έργου
  currentLang: 'el' | 'en';                                                     // Τρέχουσα επιλεγμένη γλώσσα
}

/**
 * CmsDemoModal Component (Διαδραστικός Πίνακας Ελέγχου Καλλιτέχνη - CMS Demo)
 * -------------------------------------------------------------
 * Σκοπός:
 * Αποδεικνύει στον πελάτη ότι η ανανεωμένη ιστοσελίδα προσφέρει εξαιρετικά
 * απλή, άμεση και κατανοητή διαχείριση περιεχομένου (CMS) χωρίς ανάγκη γνώσης κώδικα,
 * διατηρώντας ταυτόχρονα το υπάρχον hosting περιβάλλον του.
 * 
 * Δύο Βασικές Καρτέλες (Tabs):
 * 1. Καρτέλα 1: «Διαχείριση Έργων» (Manage Tab):
 *    - Προβολή όλων των έργων με μικρογραφία, τίτλο, σειρά, έτος και διαστάσεις.
 *    - Άμεση αλλαγή κατάστασης διαθεσιμότητας σε πραγματικό χρόνο (Available, Sold, Museum, Reserved).
 * 2. Καρτέλα 2: «Προσθήκη Νέου» (Add New Tab):
 *    - Φόρμα καταχώρισης νέου έργου με δίγλωσσους τίτλους (GR/EN), κατηγορία, έτος, διαστάσεις,
 *      υλικά/τεχνική, καλλιτεχνικό σημείωμα και προσομοίωση μεταφόρτωσης φωτογραφίας.
 *    - Άμεση δημοσίευση (Publish) που εμφανίζει το νέο έργο στην κορυφή του portfolio.
 * 
 * Βελτιστοποίηση Tablet & Αφής:
 * - Ρητό ύψος `h-[85vh]` με `touch-pan-y` και απομόνωση κλικ (`stopPropagation`)
 *   για άψογη, αβίαστη κύλιση σε iPad και οθόνες αφής.
 */
export const CmsDemoModal: React.FC<CmsDemoModalProps> = ({
  isOpen,
  onClose,
  artworks,
  onAddArtwork,
  onUpdateArtworkStatus,
  currentLang,
}) => {
  // Ενεργή καρτέλα: 'manage' (διαχείριση υπαρχόντων) ή 'add' (προσθήκη νέου)
  const [activeTab, setActiveTab] = useState<'manage' | 'add'>('manage');

  // Μήνυμα επιβεβαίωσης ενέργειας (Toast notification)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Πεδία φόρμας νέου έργου τέχνης
  const [titleEl, setTitleEl] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState<Artwork['category']>('sculpture');
  const [year, setYear] = useState<number>(2025);
  const [dimensions, setDimensions] = useState('120 × 85 × 40 cm');
  const [mediumEl, setMediumEl] = useState('Χυτός ορείχαλκος και πατίνα σε βάση ασβεστόλιθου');
  const [mediumEn, setMediumEn] = useState('Cast brass with patination on limestone base');
  const [seriesEl, setSeriesEl] = useState('Σειρά: Νέα Έργα');
  const [seriesEn, setSeriesEn] = useState('Series: New Works');
  const [descEl, setDescEl] = useState('Νέο έργο που διερευνά την ισορροπία της μάζας στο χώρο.');
  const [descEn, setDescEn] = useState('New sculptural work examining equilibrium of mass in space.');
  const [status, setStatus] = useState<Artwork['status']>('available');

  // Αν το modal είναι κλειστό, δεν αποδίδεται τίποτα
  if (!isOpen) return null;

  /**
   * Υποβολή νέου έργου τέχνης
   */
  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEl) return;

    // Χρήση δείγματος εικόνας για την προσομοίωση του νέου έργου
    const sampleImage = artworks[1]?.imageUrl || artworks[0]?.imageUrl;

    const newArt: Artwork = {
      id: `art-cms-${Date.now()}`,
      title: {
        el: titleEl,
        en: titleEn || titleEl,
      },
      category,
      year: Number(year),
      dimensions,
      medium: {
        el: mediumEl,
        en: mediumEn || mediumEl,
      },
      imageUrl: sampleImage,
      status,
      series: {
        el: seriesEl,
        en: seriesEn || seriesEl,
      },
      description: {
        el: descEl,
        en: descEn || descEl,
      },
      exhibitionHistory: ['Atelier Recent Studio Production (2025)'],
    };

    onAddArtwork(newArt);
    setSuccessMessage(
      currentLang === 'el'
        ? 'Το έργο προστέθηκε επιτυχώς στο portfolio!'
        : 'Artwork added successfully to portfolio!'
    );
    setTimeout(() => setSuccessMessage(null), 3000);
    setTitleEl('');
    setTitleEn('');
    setActiveTab('manage');
  };

  /**
   * Ζωντανή αλλαγή κατάστασης διαθεσιμότητας έργου
   */
  const handleStatusChange = (id: string, newStatus: Artwork['status']) => {
    onUpdateArtworkStatus(id, newStatus);
    setSuccessMessage(
      currentLang === 'el'
        ? 'Η κατάσταση του έργου ενημερώθηκε!'
        : 'Artwork status updated in real-time!'
    );
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 
        Πλαίσιο Παραθύρου Διαλόγου CMS:
        - Ύψος h-[85vh] & max-h-[85vh] για πλήρη συμβατότητα με tablets.
        - e.stopPropagation() ώστε τα κλικ εντός του παραθύρου να μην ενεργοποιούν το backdrop κλείσιμο.
      */}
      <div 
        className="relative w-full max-w-4xl bg-[#FAF9F5] border border-[#2E2E2E] shadow-2xl rounded-2xl flex flex-col h-[85vh] max-h-[85vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Επικεφαλίδα Παραθύρου CMS */}
        <div className="p-4 sm:p-6 bg-[#111111] text-white flex items-center justify-between border-b border-[#2A2A2A] shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E5B54F] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLang === 'el' ? 'Διαχείριση Περιεχομένου (CMS Demo)' : 'Content Management Preview (CMS)'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-semibold text-white mt-1">
              {currentLang === 'el' ? 'Πίνακας Ελέγχου Καλλιτέχνη' : 'Artist Control Dashboard'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Μπάρα Τεχνικής Επιβεβαίωσης */}
        <div className="bg-[#EFECE5] px-4 sm:px-6 py-2.5 border-b border-[#DDD6C8] text-xs text-[#555555] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <span>
            {currentLang === 'el'
              ? '💡 Προσθήκη και ενημέρωση έργων χωρίς καμία γνώση κώδικα.'
              : '💡 Effortless updates for new artworks and exhibitions without coding.'}
          </span>
          <span className="font-mono text-[#333333] text-[11px]">
            {currentLang === 'el' ? 'Συμβατό με το υπάρχον hosting' : 'Compatible with existing hosting'}
          </span>
        </div>

        {/* Κουμπιά Επιλογής Καρτέλας (Tab Switchers) */}
        <div className="flex border-b border-[#EAE4DC] bg-white px-4 sm:px-6 shrink-0">
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-3 px-3 sm:px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'manage'
                ? 'border-[#191919] text-[#191919]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            {currentLang === 'el' ? `Διαχείριση Έργων (${artworks.length})` : `Manage Artworks (${artworks.length})`}
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`py-3 px-3 sm:px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'add'
                ? 'border-[#191919] text-[#191919]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{currentLang === 'el' ? 'Προσθήκη Νέου' : 'Add New'}</span>
          </button>
        </div>

        {/* Ειδοποίηση Επιτυχίας (Success Toast) */}
        {successMessage && (
          <div className="mx-4 sm:mx-6 mt-3 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-lg flex items-center gap-2 animate-in fade-in shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* 
          Κυλιόμενο Σώμα Παραθύρου (Scrollable Modal Body):
          - flex-1 min-h-0 για ανεξάρτητο scrolling.
          - touch-pan-y για άψογη κύλιση σε iPad και οθόνες αφής.
        */}
        <div
          className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 overscroll-contain touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch' }}
          tabIndex={0}
        >
          {/* Καρτέλα 1: Διαχείριση Υπαρχόντων Έργων */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <p className="text-xs text-[#666666] mb-3">
                {currentLang === 'el'
                  ? 'Αλλάξτε άμεσα την κατάσταση ενός έργου (π.χ. σε «Ιδιωτική Συλλογή» όταν πωληθεί) και δείτε το να ενημερώνεται ζωντανά.'
                  : 'Toggle availability (e.g. when an artwork sells to a collector) and see it update live.'}
              </p>

              <div className="divide-y divide-[#EAE4DC] border border-[#EAE4DC] bg-white rounded-xl">
                {artworks.map((art) => (
                  <div key={art.id} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    {/* Μικρογραφία & Στοιχεία Έργου */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={art.imageUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded-md border border-[#E0DACE] shrink-0"
                      />
                      <div>
                        <div className="text-sm font-display font-semibold text-[#111111]">
                          {art.title[currentLang]}
                        </div>
                        <div className="text-[11px] font-mono text-[#777777]">
                          {art.series[currentLang]} · {art.year} · {art.dimensions}
                        </div>
                      </div>
                    </div>

                    {/* Επιλογέας Κατάστασης Διαθεσιμότητας */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#666666]">
                        {currentLang === 'el' ? 'Κατάσταση:' : 'Status:'}
                      </span>
                      <select
                        value={art.status}
                        onChange={(e) => handleStatusChange(art.id, e.target.value as any)}
                        className="text-xs border border-[#DDD7CD] py-1 px-2.5 bg-[#FAF9F5] focus:outline-none focus:border-[#191919] rounded-md font-medium cursor-pointer"
                      >
                        <option value="available">{currentLang === 'el' ? 'Διαθέσιμο (Available)' : 'Available'}</option>
                        <option value="private_collection">{currentLang === 'el' ? 'Ιδιωτική Συλλογή (Sold)' : 'Private Collection'}</option>
                        <option value="museum">{currentLang === 'el' ? 'Συλλογή Μουσείου' : 'Museum'}</option>
                        <option value="reserved">{currentLang === 'el' ? 'Σε Κράτηση' : 'Reserved'}</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Καρτέλα 2: Φόρμα Προσθήκης Νέου Έργου */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddNew} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#666666] font-medium mb-1">
                    {currentLang === 'el' ? 'Τίτλος Έργου (Ελληνικά) *' : 'Artwork Title (Greek) *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="π.χ. Χθόνιο Φως Ι"
                    value={titleEl}
                    onChange={(e) => setTitleEl(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] focus:border-[#191919] focus:outline-none rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#666666] font-medium mb-1">
                    {currentLang === 'el' ? 'Τίτλος Έργου (Αγγλικά)' : 'Artwork Title (English)'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chthonic Light I"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] focus:border-[#191919] focus:outline-none rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#666666] font-medium mb-1">
                    {currentLang === 'el' ? 'Κατηγορία' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] focus:border-[#191919] focus:outline-none rounded-md cursor-pointer"
                  >
                    <option value="sculpture">Γλυπτική (Sculpture)</option>
                    <option value="painting">Ζωγραφική (Painting)</option>
                    <option value="installation">Εγκατάσταση (Installation)</option>
                    <option value="drawings">Σχέδια (Drawings)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#666666] font-medium mb-1">
                    {currentLang === 'el' ? 'Έτος' : 'Year'}
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] focus:border-[#191919] focus:outline-none rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#666666] font-medium mb-1">
                    {currentLang === 'el' ? 'Διαστάσεις' : 'Dimensions'}
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] focus:border-[#191919] focus:outline-none rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#666666] font-medium mb-1">
                  {currentLang === 'el' ? 'Υλικά & Τεχνική' : 'Medium & Technique'}
                </label>
                <input
                  type="text"
                  value={mediumEl}
                  onChange={(e) => setMediumEl(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] focus:border-[#191919] focus:outline-none rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#666666] font-medium mb-1">
                  {currentLang === 'el' ? 'Καλλιτεχνικό Σημείωμα' : 'Curatorial Statement'}
                </label>
                <textarea
                  rows={2}
                  value={descEl}
                  onChange={(e) => setDescEl(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] focus:border-[#191919] focus:outline-none rounded-md"
                />
              </div>

              {/* Προσομοίωση Μεταφόρτωσης Φωτογραφίας */}
              <div className="p-4 border-2 border-dashed border-[#DDD6C8] bg-white text-center rounded-xl">
                <Image className="w-6 h-6 text-[#888888] mx-auto mb-1.5" />
                <div className="text-xs text-[#444444] font-medium">
                  {currentLang === 'el' ? 'Επιλογή φωτογραφίας υψηλής ανάλυσης' : 'Select high-resolution photo'}
                </div>
                <div className="text-[11px] text-[#888888]">
                  JPG, WebP, PNG έως 25MB (αυτόματη συμπίεση για γρήγορη φόρτωση)
                </div>
              </div>

              {/* Κουμπιά Ακύρωσης / Δημοσίευσης */}
              <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE4DC]">
                <button
                  type="button"
                  onClick={() => setActiveTab('manage')}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#666666] hover:text-[#111111] cursor-pointer"
                >
                  {currentLang === 'el' ? 'Ακύρωση' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#111111] hover:bg-[#333333] text-white rounded-full flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{currentLang === 'el' ? 'Δημοσίευση στο Portfolio' : 'Publish to Portfolio'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
