import React, { useState, useMemo } from 'react';
import { LayoutGrid, List, Search, Eye, ArrowUpRight } from 'lucide-react';
import { Artwork, ArtCategory } from '../types/art';
import { useDevice } from '../context/DeviceContext';

/**
 * Props για το PortfolioGrid Component
 */
interface PortfolioGridProps {
  artworks: Artwork[];                             // Λίστα όλων των έργων τέχνης
  currentLang: 'el' | 'en';                        // Τρέχουσα επιλεγμένη γλώσσα
  onSelectArtwork: (artwork: Artwork) => void;     // Συνάρτηση ανοίγματος του έργου σε Lightbox
  onInquireArtwork: (artwork: Artwork) => void;    // Συνάρτηση εκδήλωσης ενδιαφέροντος για συγκεκριμένο έργο
}

/**
 * PortfolioGrid Component (Ενότητα Έργων & Καταλόγου)
 * -------------------------------------------------------------
 * Κύριες λειτουργίες:
 * 1. Φιλτράρισμα ανά κατηγορία τέχνης (Όλα, Γλυπτική, Ζωγραφική, Εγκαταστάσεις, Σχέδια).
 * 2. Ζωντανή αναζήτηση βάσει τίτλου, τεχνικής/υλικού ή σειράς έργων.
 * 3. Φιλτράρισμα διαθεσιμότητας (Όλα, Διαθέσιμα στο Atelier, Συλλογή Μουσείου).
 * 4. Εναλλαγή προβολής: Πλέγμα (Grid View) ή Αναλυτικός Αρχειακός Πίνακας (Catalog List).
 * 5. Απόκριση στηλών (Responsive Grid):
 *    - Mobile: 1 στήλη (μεγάλες, ευανάγνωστες κάρτες).
 *    - Tablet: 2 στήλες (ιδανική ισορροπία χωρίς συμπίεση).
 *    - Desktop: 3 στήλες (πλήρης εκμετάλλευση οθόνης).
 * 6. Σήμανση διαθεσιμότητας (Status Badges) με διακριτικούς χρωματικούς κώδικες.
 */
export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  artworks,
  currentLang,
  onSelectArtwork,
  onInquireArtwork,
}) => {
  // Λήψη τρέχουσας συσκευής για δυναμικό καθορισμό στηλών
  const { isMobile, isTablet } = useDevice();

  // Επιλεγμένη κατηγορία τέχνης
  const [activeCategory, setActiveCategory] = useState<ArtCategory>('all');

  // Κείμενο αναζήτησης
  const [searchQuery, setSearchQuery] = useState('');

  // Τύπος προβολής: 'grid' (πλέγμα εικόνων) ή 'catalog' (πίνακας αρχείου)
  const [viewMode, setViewMode] = useState<'grid' | 'catalog'>('grid');

  // Φίλτρο διαθεσιμότητας
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'museum'>('all');

  // Λίστα κατηγοριών με δίγλωσσες περιγραφές
  const categories: { id: ArtCategory; labelEl: string; labelEn: string }[] = [
    { id: 'all', labelEl: 'Όλα τα Έργα', labelEn: 'All Works' },
    { id: 'sculpture', labelEl: 'Γλυπτική & Χώρος', labelEn: 'Sculpture' },
    { id: 'painting', labelEl: 'Ζωγραφική / Ανάγλυφα', labelEn: 'Paintings' },
    { id: 'installation', labelEl: 'Εγκαταστάσεις', labelEn: 'Installations' },
    { id: 'drawings', labelEl: 'Σχέδια σε Χαρτί', labelEn: 'Works on Paper' },
  ];

  /**
   * Φιλτραρισμένη λίστα έργων (υπολογίζεται με useMemo για βέλτιστη απόδοση)
   */
  const filteredArtworks = useMemo(() => {
    return artworks.filter((item) => {
      // Έλεγχος κατηγορίας
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Έλεγχος κατάστασης διαθεσιμότητας
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'available' && item.status === 'available') ||
        (statusFilter === 'museum' && item.status === 'museum');

      // Έλεγχος αναζήτησης σε τίτλο, υλικό και σειρά
      const matchesQuery =
        searchQuery === '' ||
        item.title[currentLang].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.medium[currentLang].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.series[currentLang].toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [artworks, activeCategory, statusFilter, searchQuery, currentLang]);

  /**
   * Επιστρέφει το αντίστοιχο εικαστικό badge διαθεσιμότητας του έργου
   */
  const getStatusBadge = (status: Artwork['status']) => {
    if (status === 'available') {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          {currentLang === 'el' ? 'Διαθέσιμο στο Atelier' : 'Available from Studio'}
        </span>
      );
    }
    if (status === 'museum') {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          {currentLang === 'el' ? 'Συλλογή Μουσείου' : 'Museum Collection'}
        </span>
      );
    }
    if (status === 'reserved') {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          {currentLang === 'el' ? 'Σε Κράτηση' : 'Reserved'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
        <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
        {currentLang === 'el' ? 'Ιδιωτική Συλλογή' : 'Private Collection'}
      </span>
    );
  };

  /**
   * Δυναμικός υπολογισμός στηλών πλέγματος βάσει της επιλεγμένης/πραγματικής συσκευής:
   * - Mobile: 1 στήλη (grid-cols-1)
   * - Tablet: 2 στήλες (grid-cols-2)
   * - Desktop: 3 στήλες (grid-cols-3)
   */
  const gridClasses = isMobile
    ? 'grid-cols-1 gap-8'
    : isTablet
    ? 'grid-cols-2 gap-6'
    : 'grid-cols-3 gap-8';

  return (
    <section id="works" className="py-16 sm:py-20 lg:py-24 border-b border-[#E8E6E0] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Επικεφαλίδα Ενότητας Έργων */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E4E0D6] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#777777] mb-2 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span>{currentLang === 'el' ? '01 // ΕΠΙΛΟΓΗ ΕΡΓΩΝ' : '01 // SELECTED WORKS'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-[#111111] tracking-tight">
              {currentLang === 'el' ? 'Κατάλογος & Σειρές Έργων' : 'Curated Portfolio Series'}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#555555] max-w-md font-normal leading-relaxed">
            {currentLang === 'el'
              ? 'Πλήρης τεκμηρίωση κάθε έργου με διαστάσεις, υλικά, προέλευση και άμεση εκδήλωση ενδιαφέροντος για συλλέκτες.'
              : 'Archival documentation for each piece with exact dimensions, materials, exhibition provenance, and collector inquiries.'}
          </p>
        </div>

        {/* Μπάρα Ελέγχου Φίλτρων, Αναζήτησης και Εναλλαγής Προβολής */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Κουμπιά Κατηγοριών (Scrollable σε κινητές συσκευές) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-2 px-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-[#EFECE5] text-[#555555] hover:text-[#111111] hover:bg-[#E5E1D8]'
                }`}
              >
                {currentLang === 'el' ? cat.labelEl : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Πεδίο Αναζήτησης, Φίλτρο Κατάστασης και Διακόπτης Grid/Catalog */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Πεδίο Αναζήτησης Έργων */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={currentLang === 'el' ? 'Αναζήτηση έργου ή τεχνικής...' : 'Search artwork, medium...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-8 pr-3 py-1.5 text-xs bg-white border border-[#DDD8CD] rounded-full focus:border-[#111111] focus:outline-none text-[#222222]"
              />
            </div>

            {/* Αναπτυσσόμενο Φίλτρο Διαθεσιμότητας */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="py-1.5 px-3 text-xs bg-white border border-[#DDD8CD] text-[#333333] rounded-full focus:border-[#111111] focus:outline-none cursor-pointer"
            >
              <option value="all">{currentLang === 'el' ? 'Όλες οι καταστάσεις' : 'All Statuses'}</option>
              <option value="available">{currentLang === 'el' ? 'Μόνο Διαθέσιμα' : 'Available Only'}</option>
              <option value="museum">{currentLang === 'el' ? 'Συλλογές Μουσείων' : 'Museum Collections'}</option>
            </select>

            {/* Εναλλαγή Προβολής Πλέγματος / Καταλόγου (Μόνο σε Desktop & Tablet) */}
            {!isMobile && (
              <div className="flex items-center border border-[#DDD8CD] bg-white rounded-full p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:text-[#111111]'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('catalog')}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    viewMode === 'catalog' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:text-[#111111]'
                  }`}
                  title="Catalog List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Μετρητής Αποτελεσμάτων & Κουμπί Επαναφοράς Φίλτρων */}
        <div className="text-xs text-[#777777] mb-6 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-wider uppercase">
            {currentLang === 'el'
              ? `Εμφάνιση ${filteredArtworks.length} από ${artworks.length} έργα`
              : `Showing ${filteredArtworks.length} of ${artworks.length} artworks`}
          </span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="hover:underline text-[#222222] font-medium cursor-pointer"
            >
              {currentLang === 'el' ? 'Επαναφορά φίλτρων' : 'Reset filters'}
            </button>
          )}
        </div>

        {/* Μήνυμα αν δεν βρέθηκαν αποτελέσματα (Empty State) */}
        {filteredArtworks.length === 0 && (
          <div className="p-16 text-center bg-white border border-[#E8E4D8] rounded-xl my-6">
            <p className="text-base font-display font-medium text-[#222222] mb-2">
              {currentLang === 'el' ? 'Δεν βρέθηκαν έργα με αυτά τα κριτήρια.' : 'No artworks matched your query.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="text-xs uppercase tracking-widest text-[#111111] font-semibold underline cursor-pointer"
            >
              {currentLang === 'el' ? 'Καθαρισμός Αναζήτησης' : 'Clear Filters'}
            </button>
          </div>
        )}

        {/* 
          Προβολή Πλέγματος (Grid View):
          Προσαρμόζεται ανάλογα με τη συσκευή: 1 στήλη (mobile), 2 στήλες (tablet), 3 στήλες (desktop)
        */}
        {(viewMode === 'grid' || isMobile) && (
          <div className={`grid ${gridClasses}`}>
            {filteredArtworks.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col bg-white border border-[#E4DEC3]/80 rounded-xl overflow-hidden hover:border-[#111111] hover:shadow-lg transition-all duration-300"
              >
                {/* Εικόνα Έργου με εφέ zoom κατά την αιώρηση και πλήκτρο μεγέθυνσης */}
                <div
                  onClick={() => onSelectArtwork(art)}
                  className="relative aspect-[4/3] bg-[#EFECE5] overflow-hidden cursor-pointer"
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title[currentLang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Επικάλυψη γρήγορης προβολής στο hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-black/75 backdrop-blur-md rounded-full">
                      <Eye className="w-3.5 h-3.5" />
                      {currentLang === 'el' ? 'Προβολή' : 'View Piece'}
                    </span>
                  </div>

                  {/* Ετικέτα Έτους Δημιουργίας */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[10px] font-mono font-medium text-[#111111] rounded-full shadow-xs">
                    {art.year}
                  </div>
                </div>

                {/* Λεπτομέρειες Κάρτας Έργου */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Σειρά και Διαστάσεις */}
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#777777] mb-2">
                      <span>{art.series[currentLang]}</span>
                      <span>{art.dimensions}</span>
                    </div>

                    {/* Τίτλος Έργου */}
                    <h3
                      onClick={() => onSelectArtwork(art)}
                      className="text-lg sm:text-xl font-display font-semibold text-[#111111] hover:text-[#555555] transition-colors cursor-pointer mb-2 leading-snug"
                    >
                      {art.title[currentLang]}
                    </h3>

                    {/* Υλικό και Τεχνική */}
                    <p className="text-xs text-[#555555] leading-relaxed mb-4 font-normal line-clamp-2">
                      {art.medium[currentLang]}
                    </p>
                  </div>

                  {/* Υποσέλιδο Κάρτας: Κατάσταση & Κουμπί Εκδήλωσης Ενδιαφέροντος */}
                  <div className="pt-4 border-t border-[#F0ECE3] flex items-center justify-between gap-2">
                    <div>{getStatusBadge(art.status)}</div>

                    <button
                      onClick={() => onInquireArtwork(art)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#111111] hover:text-[#555555] transition-colors py-1 px-2 rounded hover:bg-[#F2EFE8] cursor-pointer"
                    >
                      <span>{currentLang === 'el' ? 'Ενδιαφέρον' : 'Inquire'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 
          Προβολή Αρχειακού Καταλόγου (Catalog List View):
          Παρουσιάζει τα έργα σε δομημένο πίνακα μουσείου με πλήρη τεκμηρίωση
        */}
        {!isMobile && viewMode === 'catalog' && (
          <div className="bg-white border border-[#E4DEC3] rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E4DEC3] bg-[#FAF8F2] text-[#666666] font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-5 font-medium">{currentLang === 'el' ? 'Έργο' : 'Artwork'}</th>
                  <th className="py-3.5 px-4 font-medium">{currentLang === 'el' ? 'Σειρά' : 'Series'}</th>
                  <th className="py-3.5 px-4 font-medium">{currentLang === 'el' ? 'Υλικό & Τεχνική' : 'Medium'}</th>
                  <th className="py-3.5 px-4 font-medium">{currentLang === 'el' ? 'Διαστάσεις' : 'Dimensions'}</th>
                  <th className="py-3.5 px-4 font-medium tabular-nums">{currentLang === 'el' ? 'Έτος' : 'Year'}</th>
                  <th className="py-3.5 px-4 font-medium">{currentLang === 'el' ? 'Κατάσταση' : 'Status'}</th>
                  <th className="py-3.5 px-5 text-right font-medium">{currentLang === 'el' ? 'Ενέργεια' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE1]">
                {filteredArtworks.map((art) => (
                  <tr key={art.id} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="py-3.5 px-5 flex items-center gap-3">
                      <img
                        src={art.imageUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded-md border border-[#DDD6C5] shrink-0"
                      />
                      <button
                        onClick={() => onSelectArtwork(art)}
                        className="font-display text-sm font-semibold text-[#111111] hover:underline text-left cursor-pointer"
                      >
                        {art.title[currentLang]}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-[#666666] font-mono text-[11px]">{art.series[currentLang]}</td>
                    <td className="py-3.5 px-4 text-[#555555] max-w-xs">{art.medium[currentLang]}</td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-[#666666]">{art.dimensions}</td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-[#222222] font-medium">{art.year}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(art.status)}</td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => onInquireArtwork(art)}
                        className="px-3 py-1.5 text-xs font-semibold bg-[#111111] text-white hover:bg-[#333333] transition-colors rounded-full cursor-pointer"
                      >
                        {currentLang === 'el' ? 'Ενδιαφέρον' : 'Inquire'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
