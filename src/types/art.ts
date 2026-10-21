/**
 * Τύπος Κατηγορίας Έργου Τέχνης
 */
export type ArtCategory = 'all' | 'sculpture' | 'painting' | 'installation' | 'drawings';

/**
 * Κατάσταση Διαθεσιμότητας Έργου:
 * - 'available': Διαθέσιμο στο Atelier για απόκτηση
 * - 'private_collection': Πωλημένο σε ιδιωτική συλλογή
 * - 'museum': Μόνιμη μουσειακή συλλογή
 * - 'reserved': Σε προσωρινή κράτηση για έκθεση ή συλλέκτη
 */
export type AvailabilityStatus = 'available' | 'private_collection' | 'museum' | 'reserved';

/**
 * Διεπαφή Έργου Τέχνης (Artwork)
 */
export interface Artwork {
  id: string;                     // Μοναδικός κωδικός έργου
  title: {
    el: string;                   // Τίτλος στα Ελληνικά
    en: string;                   // Τίτλος στα Αγγλικά
  };
  category: 'sculpture' | 'painting' | 'installation' | 'drawings'; // Κατηγορία τέχνης
  year: number;                   // Έτος δημιουργίας
  dimensions: string;             // Διαστάσεις (π.χ. 120 × 85 × 40 cm)
  medium: {
    el: string;                   // Υλικά και τεχνική στα Ελληνικά
    en: string;                   // Υλικά και τεχνική στα Αγγλικά
  };
  imageUrl: string;               // Διαδρομή φωτογραφίας υψηλής ανάλυσης
  status: AvailabilityStatus;     // Κατάσταση διαθεσιμότητας
  series: {
    el: string;                   // Εικαστική σειρά στα Ελληνικά
    en: string;                   // Εικαστική σειρά στα Αγγλικά
  };
  description: {
    el: string;                   // Επιμελητικό σημείωμα / ανάλυση στα Ελληνικά
    en: string;                   // Επιμελητικό σημείωμα / ανάλυση στα Αγγλικά
  };
  exhibitionHistory?: string[];   // Προαιρετικό ιστορικό εκθέσεων
  priceRange?: string;            // Προαιρετική ένδειξη τιμολόγησης
}

/**
 * Διεπαφή Βίντεο / Κινούμενης Εικόνας (VideoItem)
 */
export interface VideoItem {
  id: string;                     // Μοναδικός κωδικός βίντεο
  title: {
    el: string;                   // Τίτλος βίντεο στα Ελληνικά
    en: string;                   // Τίτλος βίντεο στα Αγγλικά
  };
  type: 'process' | 'walkthrough' | 'videoart'; // Τύπος (διαδικασία, περιήγηση έκθεσης, video art)
  duration: string;               // Διάρκεια (π.χ. "0:48")
  thumbnailUrl: string;           // Μικρογραφία προεπισκόπησης
  videoPlaceholderUrl?: string;   // Προαιρετική πηγή streaming
  year: number;                   // Έτος παραγωγής
  description: {
    el: string;                   // Περιγραφή περιεχομένου στα Ελληνικά
    en: string;                   // Περιγραφή περιεχομένου στα Αγγλικά
  };
}

/**
 * Διεπαφή Έκθεσης (Exhibition)
 */
export interface Exhibition {
  year: number;                   // Έτος πραγματοποίησης
  title: string;                  // Τίτλος έκθεσης
  venue: string;                  // Χώρος / Μουσείο / Γκαλερί
  city: string;                   // Πόλη διεξαγωγής
  type: 'solo' | 'group';         // Ατομική ή Ομαδική
}

/**
 * Διεπαφή Βραβείου / Υποτροφίας (AwardItem)
 */
export interface AwardItem {
  year: number;                   // Έτος απονομής
  title: string;                  // Τίτλος βραβείου
  institution: string;            // Φορέας απονομής / Ίδρυμα
}

/**
 * Διεπαφή Προφίλ Καλλιτέχνη (ArtistProfile)
 */
export interface ArtistProfile {
  name: {
    el: string;                   // Ονοματεπώνυμο στα Ελληνικά
    en: string;                   // Ονοματεπώνυμο στα Αγγλικά
  };
  subtitle: {
    el: string;                   // Ιδιότητα στα Ελληνικά
    en: string;                   // Ιδιότητα στα Αγγλικά
  };
  statement: {
    el: string;                   // Καλλιτεχνική δήλωση στα Ελληνικά
    en: string;                   // Καλλιτεχνική δήλωση στα Αγγλικά
  };
  shortBio: {
    el: string;                   // Σύντομο βιογραφικό στα Ελληνικά
    en: string;                   // Σύντομο βιογραφικό στα Αγγλικά
  };
  studioLocation: {
    el: string;                   // Τοποθεσία ατελιέ στα Ελληνικά
    en: string;                   // Τοποθεσία ατελιέ στα Αγγλικά
  };
  email: string;                  // Email επικοινωνίας
  phone: string;                  // Τηλέφωνο
  instagram: string;              // Instagram handle
  representation: {
    name: string;                 // Όνομα συνεργαζόμενης γκαλερί
    city: string;                 // Πόλη γκαλερί
  }[];
}
