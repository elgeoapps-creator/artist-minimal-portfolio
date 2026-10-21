import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Clock, Sparkles } from 'lucide-react';
import { VideoItem } from '../types/art';
import { useDevice } from '../context/DeviceContext';

/**
 * Props για το VideoSection Component
 */
interface VideoSectionProps {
  videos: VideoItem[];             // Λίστα διαθέσιμων σύντομων βίντεο (Reels)
  currentLang: 'el' | 'en';        // Τρέχουσα επιλεγμένη γλώσσα
}

/**
 * VideoSection Component (Ενότητα Κινούμενης Εικόνας & Ατελιέ)
 * -------------------------------------------------------------
 * Κύρια χαρακτηριστικά & λειτουργίες:
 * 1. Ειδικά προσαρμοσμένος Video Player για εικαστικούς καλλιτέχνες:
 *    - Αναπαραγωγή/Παύση (Play / Pause).
 *    - Σίγαση / Ενεργοποίηση Ήχου (Mute / Unmute).
 *    - Διαδραστική μπάρα προόδου (Progress bar) με δυνατότητα κλικ σε οποιοδήποτε σημείο.
 *    - Προσομοίωση αναπαραγωγής με χρονοδιακόπτη (timer interval).
 * 2. Playlist Reel (Δεξιά Στήλη):
 *    - Επιλογή μεταξύ διαφορετικών ειδών βίντεο:
 *      * Studio Process (διαδικασία χύτευσης & δημιουργίας).
 *      * Exhibition Walkthrough (κινηματογραφική περιήγηση σε μουσειακό χώρο).
 *      * Video Art (πειραματική ψηφιακή εικαστική δημιουργία).
 * 3. Τεχνική Σημείωση Φιλοξενίας:
 *    - Επεξήγηση στον πελάτη ότι τα βίντεο μπορούν να φιλοξενούνται εξωτερικά
 *      (π.χ. Vimeo Pro / Cloudflare Stream) χωρίς να επιβαρύνουν το δικό του hosting server.
 */
export const VideoSection: React.FC<VideoSectionProps> = ({ videos, currentLang }) => {
  // Λήψη τρέχουσας κατάστασης συσκευής
  const { isMobile } = useDevice();

  // Το ενεργό βίντεο που προβάλλεται στον κύριο player
  const [activeVideo, setActiveVideo] = useState<VideoItem>(videos[0]);

  // Κατάσταση αναπαραγωγής (true = παίζει, false = σε παύση)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Κατάσταση σίγασης ήχου
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Ποσοστό προόδου αναπαραγωγής (0% - 100%)
  const [progress, setProgress] = useState<number>(15);

  /**
   * Προσομοίωση κύλισης προόδου αναπαραγωγής κατά τη διάρκεια του play
   */
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  /**
   * Επιλογή νέου βίντεο από τη λίστα (Playlist)
   * @param video Το επιλεγμένο βίντεο
   */
  const handleSelectVideo = (video: VideoItem) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setProgress(0);
  };

  return (
    <section id="videos" className="py-16 sm:py-20 lg:py-24 bg-[#0F0F0F] text-[#E5E5E5] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Επικεφαλίδα Ενότητας Βίντεο */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#252525] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#A0A0A0] mb-2 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B54F]" />
              <span>{currentLang === 'el' ? '02 // ΚΙΝΟΥΜΕΝΗ ΕΙΚΟΝΑ & ΔΙΑΔΙΚΑΣΙΑ' : '02 // MOTION & STUDIO PRACTICE'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-white tracking-tight">
              {currentLang === 'el' ? 'Σύντομα Βίντεο & Περιηγήσεις' : 'Short Videos & Walkthroughs'}
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-[#A0A0A0] max-w-md font-normal leading-relaxed">
            {currentLang === 'el'
              ? 'Ενσωμάτωση video art, καταγραφή δημιουργικής διαδικασίας στο ατελιέ και κινηματογραφικές περιηγήσεις σε εκθέσεις.'
              : 'Integration of video art, documented studio techniques, and curated exhibition walkthroughs.'}
          </div>
        </div>

        {/* Πλέγμα Video Player & Playlist */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 lg:grid-cols-12 gap-8'} items-start`}>
          {/* Κύρια Οθόνη Player (Αριστερή Στήλη) */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-8'} flex flex-col bg-[#161616] border border-[#2B2B2B] rounded-xl overflow-hidden shadow-2xl`}>
            {/* Πλαίσιο Προβολής Βίντεο 16:9 */}
            <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center group">
              <img
                src={activeVideo.thumbnailUrl}
                alt={activeVideo.title[currentLang]}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  isPlaying ? 'scale-105 filter brightness-95' : 'scale-100 filter brightness-85'
                }`}
              />

              {/* Σκίαση για ευκρίνεια χειριστηρίων */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Κεντρικό Κουμπί Αναπαραγωγής / Παύσης */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute z-10 w-16 h-16 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transition-all transform hover:scale-110 shadow-lg cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>

              {/* Ένδειξη Κατάστασης "PLAYING" */}
              {isPlaying && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-black/75 backdrop-blur-md text-[10px] tracking-widest uppercase font-mono text-white rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>PLAYING · {activeVideo.duration}</span>
                </div>
              )}

              {/* Κάτω Μπάρα Χειριστηρίων (Controls Bar) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 z-10">
                {/* Διαδραστική Μπάρα Προόδου */}
                <div
                  className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress((clickX / rect.width) * 100);
                  }}
                >
                  <div
                    className="h-full bg-[#E5B54F] transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-stone-300 pt-1">
                  <div className="flex items-center gap-4">
                    {/* Κουμπί Play/Pause */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    {/* Κουμπί Σίγασης Ήχου */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      <span className="text-[10px] hidden sm:inline">{isMuted ? 'Muted' : 'Audio'}</span>
                    </button>

                    {/* Ένδειξη Χρόνου */}
                    <span className="font-mono text-[11px] tabular-nums text-stone-400">
                      {Math.floor((progress / 100) * 48)}s / {activeVideo.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                      1080P HD
                    </span>
                    <button
                      onClick={() => {
                        const elem = document.getElementById('videos');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-white transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Περιγραφή Ενεργού Βίντεο */}
            <div className="p-5 sm:p-6 bg-[#161616]">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#888888] uppercase tracking-wider mb-2">
                <span>
                  {activeVideo.type === 'process'
                    ? (currentLang === 'el' ? 'Διαδικασία Εργαστηρίου' : 'Studio Craft')
                    : activeVideo.type === 'walkthrough'
                    ? (currentLang === 'el' ? 'Περιήγηση Έκθεσης' : 'Exhibition Tour')
                    : (currentLang === 'el' ? 'Εικαστικό Βίντεο' : 'Video Art Piece')}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{activeVideo.year}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{activeVideo.duration}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-2">
                {activeVideo.title[currentLang]}
              </h3>

              <p className="text-xs sm:text-sm text-[#CCCCCC] font-normal leading-relaxed">
                {activeVideo.description[currentLang]}
              </p>
            </div>
          </div>

          {/* Δεξιά Στήλη: Λίστα Επιλογής Βίντεο (Playlist Reel) */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-4'} flex flex-col gap-3.5`}>
            <div className="flex items-center justify-between pb-2 border-b border-[#252525] text-xs font-mono uppercase tracking-wider text-[#888888]">
              <span className="flex items-center gap-1.5 font-medium">
                <Film className="w-3.5 h-3.5" />
                {currentLang === 'el' ? 'Επιλογή Reel (3 Βίντεο)' : 'Select Reel (3 Clips)'}
              </span>
              <span>60 FPS</span>
            </div>

            {videos.map((vid) => {
              const isActive = vid.id === activeVideo.id;
              return (
                <div
                  key={vid.id}
                  onClick={() => handleSelectVideo(vid)}
                  className={`p-3 sm:p-3.5 flex gap-3.5 cursor-pointer border transition-all duration-200 rounded-xl ${
                    isActive
                      ? 'bg-[#222222] border-[#E5B54F] shadow-md'
                      : 'bg-[#141414] border-[#252525] hover:bg-[#1C1C1C] hover:border-[#3E3E3E]'
                  }`}
                >
                  {/* Μικρογραφία Βίντεο (Thumbnail) */}
                  <div className="relative w-24 sm:w-28 aspect-video bg-black shrink-0 overflow-hidden rounded-lg border border-white/10">
                    <img
                      src={vid.thumbnailUrl}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-current" />
                    </div>
                    <span className="absolute bottom-1 right-1 px-1 text-[9px] bg-black/80 font-mono text-white rounded">
                      {vid.duration}
                    </span>
                  </div>

                  {/* Τίτλος & Διάρκεια */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888] mb-0.5">
                        {vid.type === 'process'
                          ? (currentLang === 'el' ? 'Studio' : 'Studio')
                          : vid.type === 'walkthrough'
                          ? (currentLang === 'el' ? 'Έκθεση' : 'Tour')
                          : (currentLang === 'el' ? 'Video Art' : 'Video Art')}
                      </div>
                      <h4 className="text-xs font-display font-medium text-white truncate">
                        {vid.title[currentLang]}
                      </h4>
                    </div>

                    <div className="text-[11px] text-stone-400 flex items-center gap-1.5 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{vid.duration}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Τεχνική Σημείωση για τον Πελάτη */}
            <div className="p-4 bg-[#141414] border border-[#252525] rounded-xl mt-1 text-xs">
              <div className="flex items-center gap-1.5 text-[#E5B54F] font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentLang === 'el' ? 'Τεχνική Σημείωση για τον Πελάτη' : 'Technical Delivery Note'}</span>
              </div>
              <p className="text-[#AAAAAA] leading-relaxed text-[11px]">
                {currentLang === 'el'
                  ? 'Τα βίντεο φορτώνουν ταχύτατα μέσω Vimeo Pro / Cloudflare Stream, προστατεύοντας το bandwidth του υπάρχοντος hosting σας.'
                  : 'Streamed via Vimeo Pro / Cloudflare Stream, consuming zero server disk bandwidth from your existing host.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
