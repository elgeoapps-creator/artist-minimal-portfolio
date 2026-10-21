import React, { useState } from 'react';
import { Download, Check, Award, BookOpen, Building2 } from 'lucide-react';
import { ArtistProfile, Exhibition, AwardItem } from '../types/art';
import { studioSpaceImg } from '../data/artData';
import { useDevice } from '../context/DeviceContext';

/**
 * Props για το Biography Component
 */
interface BiographyProps {
  profile: ArtistProfile;          // Πληροφορίες καλλιτεχνικού προφίλ & δήλωση (statement)
  exhibitions: Exhibition[];       // Χρονολόγιο εκθέσεων
  awards: AwardItem[];             // Λίστα βραβείων, υποτροφιών και fellowships
  currentLang: 'el' | 'en';        // Τρέχουσα επιλεγμένη γλώσσα
}

/**
 * Biography Component (Ενότητα Βιογραφικού & Εκθέσεων)
 * -------------------------------------------------------------
 * Χαρακτηριστικά & Λειτουργίες:
 * 1. Κεντρική Επικεφαλίδα & Λήψη Βιογραφικού:
 *    - Πλήκτρο λήψης πλήρους CV σε μορφή PDF με οπτική επιβεβαίωση (Download Success State).
 * 2. Ατμόσφαιρα Ατελιέ & Επιμελητική Δήλωση (Statement):
 *    - Φωτογραφία εργαστηρίου σύγχρονης αισθητικής.
 *    - Αναλυτική περιγραφή καλλιτεχνικής φιλοσοφίας και ερευνητικής προσέγγισης των υλικών.
 * 3. Ακαδημαϊκή Εκπαίδευση & Δημόσιες/Ιδιωτικές Συλλογές.
 * 4. Χρονολόγιο Εκθέσεων με Διαδραστικό Φίλτρο:
 *    - Όλες (All), Ατομικές (Solo), Ομαδικές (Group).
 * 5. Βραβεία, Υποτροφίες (Grants) & Επίσημη Εκπροσώπηση από Galleries σε Ελλάδα και εξωτερικό.
 */
export const Biography: React.FC<BiographyProps> = ({
  profile,
  exhibitions,
  awards,
  currentLang,
}) => {
  // Λήψη κατάστασης συσκευής
  const { isMobile } = useDevice();

  // Φίλτρο επιλεγμένου τύπου έκθεσης ('all' | 'solo' | 'group')
  const [exhibitionFilter, setExhibitionFilter] = useState<'all' | 'solo' | 'group'>('all');

  // Κατάσταση επιτυχούς προσομοίωσης λήψης PDF
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  /**
   * Φιλτραρισμένες εκθέσεις βάσει του επιλεγμένου τύπου (Όλες / Ατομικές / Ομαδικές)
   */
  const filteredExhibitions = exhibitions.filter((e) => {
    if (exhibitionFilter === 'all') return true;
    return e.type === exhibitionFilter;
  });

  /**
   * Χειρισμός λήψης βιογραφικού: Εμφανίζει ένδειξη επιτυχίας για 3 δευτερόλεπτα
   */
  const handleDownloadCv = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="bio" className="py-16 sm:py-20 lg:py-24 border-b border-[#E8E6E0] bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Επικεφαλίδα Ενότητας & Πλήκτρο Λήψης CV */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E4DEC3] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#777777] mb-2 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span>{currentLang === 'el' ? '03 // ΚΑΛΛΙΤΕΧΝΙΚΟ ΠΡΟΦΙΛ' : '03 // ARTIST PROFILE'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-[#111111] tracking-tight">
              {currentLang === 'el' ? 'Βιογραφικό & Εκθέσεις' : 'Biography & Exhibition Record'}
            </h2>
          </div>

          {/* Κουμπί Λήψης CV σε PDF με δυναμική ένδειξη επιβεβαίωσης */}
          <button
            onClick={handleDownloadCv}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#111111] text-white hover:bg-[#333333] transition-colors rounded-full shrink-0 cursor-pointer shadow-xs"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentLang === 'el' ? 'Λήφθηκε: CV_Ariadne_Valvi.pdf' : 'Downloaded: CV_Ariadne_Valvi.pdf'}</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>{currentLang === 'el' ? 'Λήψη Πλήρους CV (PDF)' : 'Download Full CV (PDF)'}</span>
              </>
            )}
          </button>
        </div>

        {/* 
          Επάνω Τμήμα Βιογραφικού: 
          Αριστερά: Φωτογραφία χώρου εργαστηρίου (Studio Atmosphere)
          Δεξιά: Καλλιτεχνικό Statement, Σύντομο Βιογραφικό & Σπουδές
        */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14'} items-start mb-14`}>
          {/* Στήλη Χώρου Εργαστηρίου */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-4'}`}>
            <div className="relative aspect-square bg-[#ECE7DC] border border-[#DDD6C5] rounded-xl overflow-hidden shadow-xs">
              <img
                src={studioSpaceImg}
                alt={profile.name[currentLang]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
              />
            </div>
            <div className="mt-3 text-[11px] font-mono text-[#777777] flex justify-between px-1">
              <span>{profile.name[currentLang]} · Atelier</span>
              <span>Contemporary Studio</span>
            </div>
          </div>

          {/* Στήλη Δήλωσης & Σπουδών */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-8'} flex flex-col justify-between`}>
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#111111] mb-4">
                {profile.subtitle[currentLang]}
              </h3>

              <div className="text-sm text-[#444444] font-normal leading-relaxed mb-6 space-y-4">
                <p>{profile.statement[currentLang]}</p>
                <p>{profile.shortBio[currentLang]}</p>
              </div>

              {/* Πλαίσια Σπουδών και Συλλογών */}
              <div className="border-t border-[#E8E4D8] pt-5 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="p-4 bg-white border border-[#E8E4D8] rounded-xl">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#888888] mb-2 font-medium flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#111111]" />
                    <span>{currentLang === 'el' ? 'Σπουδές & Ειδίκευση' : 'Studies & Background'}</span>
                  </div>
                  <ul className="space-y-2 text-[#333333]">
                    <li>
                      <span className="font-semibold text-[#111111]">Master of Fine Arts (MFA)</span>
                      <div className="text-[#666666]">Contemporary Spatial Practice (2014–2016)</div>
                    </li>
                    <li>
                      <span className="font-semibold text-[#111111]">Πτυχίο Εικαστικών Τεχνών (BFA)</span>
                      <div className="text-[#666666]">Κατεύθυνση Γλυπτικής & Μεικτών Τεχνικών</div>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-[#E8E4D8] rounded-xl">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#888888] mb-2 font-medium flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#111111]" />
                    <span>{currentLang === 'el' ? 'Συλλογές (Ενδεικτικά)' : 'Collections (Sample)'}</span>
                  </div>
                  <ul className="space-y-1.5 text-[#444444] text-[11px]">
                    <li>• Μουσείο Σύγχρονης Τέχνης (Μόνιμο Αρχείο)</li>
                    <li>• Ίδρυμα Εικαστικής Δημιουργίας</li>
                    <li>• Επιλεγμένες ιδιωτικές συλλογές (Ελλάδα & εξωτερικό)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 
          Κάτω Τμήμα:
          Αριστερά (8 στήλες): Χρονολόγιο Εκθέσεων με segmented φίλτρο (Όλες, Ατομικές, Ομαδικές)
          Δεξιά (4 στήλες): Βραβεία, Υποτροφίες & Επίσημη Εκπροσώπηση Gallery
        */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-10' : 'grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14'}`}>
          {/* Χρονολόγιο Εκθέσεων */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-8'}`}>
            <div className="flex flex-wrap items-center justify-between mb-6 pb-2 border-b border-[#E8E4D8] gap-3">
              <h3 className="text-lg font-display font-semibold text-[#111111]">
                {currentLang === 'el' ? 'Επιλεγμένες Εκθέσεις' : 'Exhibitions Record'}
              </h3>

              {/* Διακόπτης Φίλτρου Εκθέσεων (Όλες / Ατομικές / Ομαδικές) */}
              <div className="flex items-center gap-1 bg-[#EFECE5] p-1 rounded-full text-xs">
                <button
                  onClick={() => setExhibitionFilter('all')}
                  className={`px-3 py-1 rounded-full transition-colors font-medium cursor-pointer ${
                    exhibitionFilter === 'all' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  {currentLang === 'el' ? 'Όλες' : 'All'}
                </button>
                <button
                  onClick={() => setExhibitionFilter('solo')}
                  className={`px-3 py-1 rounded-full transition-colors font-medium cursor-pointer ${
                    exhibitionFilter === 'solo' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  {currentLang === 'el' ? 'Ατομικές' : 'Solo'}
                </button>
                <button
                  onClick={() => setExhibitionFilter('group')}
                  className={`px-3 py-1 rounded-full transition-colors font-medium cursor-pointer ${
                    exhibitionFilter === 'group' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  {currentLang === 'el' ? 'Ομαδικές' : 'Group'}
                </button>
              </div>
            </div>

            {/* Λίστα Εκθέσεων */}
            <div className="space-y-3">
              {filteredExhibitions.map((exh, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between py-3 px-3 bg-white border border-[#EAE6DC] rounded-lg text-xs gap-2 sm:gap-4 hover:border-[#111111] transition-all"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono tabular-nums text-[#888888] font-bold shrink-0 bg-[#F5F2EB] px-2 py-0.5 rounded">
                      {exh.year}
                    </span>
                    <span className="font-display text-sm text-[#111111] font-semibold">
                      {exh.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#666666] shrink-0 sm:text-right pl-10 sm:pl-0 text-[11px]">
                    <span className="font-medium text-[#333333]">{exh.venue}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#888888]">{exh.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Στήλη Βραβείων & Εκπροσώπησης Gallery */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-4'}`}>
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[#E8E4D8]">
              <Award className="w-4 h-4 text-[#888888]" />
              <h3 className="text-lg font-display font-semibold text-[#111111]">
                {currentLang === 'el' ? 'Βραβεία & Fellowships' : 'Grants & Fellowships'}
              </h3>
            </div>

            <div className="space-y-3">
              {awards.map((award, idx) => (
                <div key={idx} className="p-4 bg-white border border-[#EAE6DC] rounded-xl hover:border-[#CCCCCC] transition-colors">
                  <div className="font-mono tabular-nums text-[11px] text-[#888888] font-bold mb-1">
                    {award.year}
                  </div>
                  <div className="text-xs font-display font-semibold text-[#111111] mb-1">
                    {award.title}
                  </div>
                  <div className="text-[11px] text-[#666666]">
                    {award.institution}
                  </div>
                </div>
              ))}
            </div>

            {/* Πλαίσιο Επίσημης Εκπροσώπησης Gallery */}
            <div className="mt-6 p-4 bg-[#F2EDE4] border border-[#DDD5C5] rounded-xl text-xs text-[#555555]">
              <div className="font-semibold text-[#111111] mb-1">
                {currentLang === 'el' ? 'Επίσημη Εκπροσώπηση Gallery' : 'Official Gallery Representation'}
              </div>
              <p className="leading-relaxed text-[11px]">
                Contemporary Art Projects (Αθήνα / Βερολίνο) & Galerie Spatial Forms (Παρίσι).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
