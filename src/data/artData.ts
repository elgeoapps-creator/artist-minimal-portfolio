/**
 * Βάση Δεδομένων Παρουσίασης Εικαστικού Καλλιτέχνη (Mock Archival Data Store)
 * --------------------------------------------------------------------------
 * Περιέχει:
 * 1. Φανταστικό Προφίλ Καλλιτέχνη («Αριάδνη Βάλβη / Ariadne Valvi») για ασφαλή επίδειξη σε πελάτες.
 * 2. Μουσειακές φωτογραφίες υψηλής ανάλυσης έργων (γλυπτική, εγκαταστάσεις, ανάγλυφοι καμβάδες).
 * 3. Αρχική συλλογή έργων τέχνης (initialArtworks) με πλήρη μεταδεδομένα (διαστάσεις, υλικά, κατάσταση).
 * 4. Κατάλογο σύντομων βίντεο (initialVideos) για την ενότητα κίνησης και ατελιέ.
 * 5. Χρονολόγιο εκθέσεων (exhibitionsData) και διακρίσεων (awardsData).
 * 6. Βασικούς πυλώνες προδιαγραφών έργου (clientPitchPoints) για την παρουσίαση.
 */
import { Artwork, VideoItem, Exhibition, AwardItem, ArtistProfile } from '../types/art';

// Εισαγωγή ψηφιακά δημιουργημένων μουσειακών φωτογραφιών υψηλής ανάλυσης
import heroInstallationImg from '../assets/images/hero_art_installation_1792529139896.jpg';
import sculpturePedestalImg from '../assets/images/artwork_sculpture_pedestal_1792529140793.jpg';
import abstractCanvasImg from '../assets/images/artwork_abstract_canvas_1792529141000.jpg';
import studioSpaceImg from '../assets/images/artist_studio_space_1792529142374.jpg';

// Φανταστικό προφίλ καλλιτέχνη (Fictional Artist Profile)
export const initialArtistProfile: ArtistProfile = {
  name: {
    el: 'Αριάδνη Βάλβη',
    en: 'Ariadne Valvi'
  },
  subtitle: {
    el: 'Εικαστικός Καλλιτέχνης · Γλυπτική, Μεικτή Τεχνική & Εγκαταστάσεις (Demo)',
    en: 'Visual Artist · Sculpture, Mixed Media & Spatial Installations (Demo)'
  },
  statement: {
    el: 'Η εικαστική έρευνα επικεντρώνεται στην ένταση μεταξύ οργανικής φθοράς και αρχιτεκτονικής πειθαρχίας. Μέσα από τον χυτό ορείχαλκο, τον άψητο πηλό, τον φυσικό ασβέστη και τα μεγάλα ανάγλυφα τελάρα, αναζητούνται τα ίχνη που αφήνει ο χρόνος πάνω στην ύλη και την ανθρώπινη μνήμη.',
    en: 'Artistic research investigating the dialectic tension between organic degradation and architectural discipline. Working across cast bronze, unbaked clay, natural lime, and monumental textured canvases, exploring the residues left by time upon tangible matter.'
  },
  shortBio: {
    el: 'Απόφοιτος Ανωτάτης Σχολής Καλών Τεχνών με μεταπτυχιακή ειδίκευση στη Σύγχρονη Γλυπτική. Έργα και εγκαταστάσεις έχουν παρουσιαστεί σε επιμελημένες εκθέσεις σύγχρονης τέχνης, biennale και επιλεγμένες ιδιωτικές συλλογές.',
    en: 'Graduate of Fine Arts with post-graduate research in Contemporary Spatial Sculpture. Works and installations have been presented in curated contemporary exhibitions, biennales, and private collections.'
  },
  studioLocation: {
    el: 'Κέντρο Εικαστικών Τεχνών, Αθήνα (επισκέψεις κατόπιν ραντεβού)',
    en: 'Arts District, Athens (visits by appointment)'
  },
  email: 'studio@artist-portfolio.demo',
  phone: '+30 210 000 0000',
  instagram: '@atelier.contemporary.art',
  representation: [
    { name: 'Contemporary Art Projects', city: 'Athens / Berlin' },
    { name: 'Spatial Forms Gallery', city: 'Paris' }
  ]
};

// Social media links for contemporary artist presence
export const socialLinks = [
  {
    name: 'Instagram',
    handle: '@atelier.contemporary',
    url: 'https://instagram.com',
    icon: 'instagram'
  },
  {
    name: 'Artsy',
    handle: 'Artsy Gallery Profile',
    url: 'https://artsy.net',
    icon: 'palette'
  },
  {
    name: 'Vimeo / Video',
    handle: 'Studio Video Art Archive',
    url: 'https://vimeo.com',
    icon: 'video'
  },
  {
    name: 'Behance / Monograph',
    handle: 'Curatorial Portfolio',
    url: 'https://behance.net',
    icon: 'globe'
  }
];

export const initialArtworks: Artwork[] = [
  {
    id: 'art-01',
    title: {
      el: 'Μνήμη του Ασβέστη & Χάλυβας Ι',
      en: 'Memory of Lime & Steel I'
    },
    category: 'installation',
    year: 2024,
    dimensions: '380 × 260 × 190 cm',
    medium: {
      el: 'Λευκό μάρμαρο, οξειδωμένος δομικός χάλυβας, φυσικός ασβέστης',
      en: 'White marble, oxidized structural steel, natural slaked lime'
    },
    imageUrl: heroInstallationImg,
    status: 'museum',
    series: {
      el: 'Σειρά: Materia & Silence',
      en: 'Series: Materia & Silence'
    },
    description: {
      el: 'Μνημειακή εγκατάσταση που διερευνά το αρχιτεκτονικό κενό και την τραχύτητα των φυσικών ορυκτών υλικών.',
      en: 'Monumental spatial installation examining architectural void and the raw textures of natural minerals.'
    },
    exhibitionHistory: ['Έκθεση Σύγχρονων Μορφών (2024)', 'Biennale Νέας Εικαστικής Δημιουργίας (2023)'],
    priceRange: 'Μόνιμη Συλλογή Μουσείου'
  },
  {
    id: 'art-02',
    title: {
      el: 'Οργανική Αναδίπλωση #4',
      en: 'Organic Folding #4'
    },
    category: 'sculpture',
    year: 2024,
    dimensions: '68 × 52 × 44 cm',
    medium: {
      el: 'Χαμοτική τερακότα, πράσινη πατίνα χαλκού, χύτευση σε κερί',
      en: 'Chamotte terracotta, green copper patina, lost-wax bronze casting'
    },
    imageUrl: sculpturePedestalImg,
    status: 'available',
    series: {
      el: 'Σειρά: Κύματα Γαιών',
      en: 'Series: Earth Currents'
    },
    description: {
      el: 'Γλυπτό με χειροποίητη υφή και οξειδωμένο χαλκό, εμπνευσμένο από τη γεωλογική διάβρωση και τις αρχαίες τεχνικές όπτησης.',
      en: 'Sculptural study in handcrafted texture and oxidized bronze, drawing upon geological erosion and primitive firing.'
    },
    exhibitionHistory: ['Contemporary Art Fair (Stand Gallery Forms)', 'Atelier Solo Showcase'],
    priceRange: 'Διαθέσιμο κατόπιν επικοινωνίας'
  },
  {
    id: 'art-03',
    title: {
      el: 'Στρώσεις Καπνού & Ώχρας ΙΙΙ',
      en: 'Strata of Smoke & Ochre III'
    },
    category: 'painting',
    year: 2023,
    dimensions: '210 × 180 cm',
    medium: {
      el: 'Λάδι, κάρβουνο, ακατέργαστη ώχρα και άμμος σε λινό μουσαμά',
      en: 'Oil, vine charcoal, raw mineral ochre and quartz sand on raw linen'
    },
    imageUrl: abstractCanvasImg,
    status: 'private_collection',
    series: {
      el: 'Σειρά: Γεωλογικά Χρονικά',
      en: 'Series: Geological Chronicles'
    },
    description: {
      el: 'Ανάγλυφος καμβάς μεγάλης κλίμακας με αλλεπάλληλες επιστρώσεις πυκνής ύλης και γραφής.',
      en: 'Large-scale tactile canvas with dense multi-layered impasto and rhythmic physical scraping.'
    },
    exhibitionHistory: ['Ατομική Έκθεση "Υλικά Ίχνη" (2023)'],
    priceRange: 'Ιδιωτική Συλλογή'
  },
  {
    id: 'art-04',
    title: {
      el: 'Αποτύπωμα Εδάφους & Τσιμέντου',
      en: 'Ground Imprint & Concrete'
    },
    category: 'installation',
    year: 2023,
    dimensions: 'Διαστάσεις μεταβλητές (in situ)',
    medium: {
      el: 'Βιομηχανικός γύψος, θραύσματα κεραμικών, σκωρία σιδήρου',
      en: 'Industrial plaster, terracotta shards, iron slag'
    },
    imageUrl: studioSpaceImg,
    status: 'available',
    series: {
      el: 'Σειρά: Materia & Silence',
      en: 'Series: Materia & Silence'
    },
    description: {
      el: 'Επιτόπια εγκατάσταση που αναπτύσσεται στο χώρο του ατελιέ και διαμορφώνεται ανάλογα με τη γεωμετρία της εκάστοτε αίθουσας.',
      en: 'Site-specific installation developed within the atelier, adaptable to gallery interior geometries.'
    },
    exhibitionHistory: ['Open Studios Project Space (2023)'],
    priceRange: 'Διαθέσιμο για παραγγελία / Ανάθεση'
  },
  {
    id: 'art-05',
    title: {
      el: 'Σπουδή Αναπνοής & Σιωπής IV',
      en: 'Breath & Silence Study IV'
    },
    category: 'drawings',
    year: 2024,
    dimensions: '76 × 56 cm',
    medium: {
      el: 'Μελάνι σουμί, γραφίτης και κερί σε χειροποίητο χαρτί Washi',
      en: 'Sumi ink, graphite, and beeswax on handmade Japanese paper'
    },
    imageUrl: abstractCanvasImg,
    status: 'available',
    series: {
      el: 'Σειρά: Σχέδια στο Χαρτί',
      en: 'Series: Works on Paper'
    },
    description: {
      el: 'Μινιμαλιστική χειρονομιακή γραφή που αποτυπώνει το ρυθμό της αναπνοής και την πυκνότητα της σκιάς.',
      en: 'Minimal gestural drawing registering breathing cadence and tonal shadow densities.'
    },
    exhibitionHistory: ['Works on Paper Contemporary Fair, Milan'],
    priceRange: 'Διαθέσιμο'
  },
  {
    id: 'art-06',
    title: {
      el: 'Σκελετός του Χώρου (Sculptural maquette)',
      en: 'Armature of Void (Sculptural maquette)'
    },
    category: 'sculpture',
    year: 2024,
    dimensions: '45 × 38 × 30 cm',
    medium: {
      el: 'Μασίφ σφυρήλατος μπρούντζος και βάση από λευκό μάρμαρο',
      en: 'Solid hand-forged bronze on white marble base'
    },
    imageUrl: sculpturePedestalImg,
    status: 'reserved',
    series: {
      el: 'Σειρά: Αρχιτεκτονικά Θραύσματα',
      en: 'Series: Architectural Fragments'
    },
    description: {
      el: 'Γλυπτική μακέτα για δημόσιο έργο, εστιάζοντας στη διάθλαση του φωτός και την αίσθηση του κενού.',
      en: 'Sculptural maquette for civic commissions, meditating on light refraction and hollows.'
    },
    exhibitionHistory: ['Art Contemporary Forum (2024)'],
    priceRange: 'Σε Κράτηση'
  }
];

export const initialVideos: VideoItem[] = [
  {
    id: 'vid-01',
    title: {
      el: 'Atelier Process: Χύτευση & Πυράκτωση (0:48)',
      en: 'Atelier Process: Casting & Smelting (0:48)'
    },
    type: 'process',
    duration: '0:48',
    thumbnailUrl: studioSpaceImg,
    year: 2024,
    description: {
      el: 'Σύντομο ατμοσφαιρικό βίντεο από τη διαδικασία διαμόρφωσης πηλού και χύτευσης ορείχαλκου στο εργαστήριο.',
      en: 'Atmospheric short video capturing clay sculpting and bronze pour workflows inside the studio.'
    }
  },
  {
    id: 'vid-02',
    title: {
      el: 'Exhibition Walkthrough: "Materia & Silence" (1:12)',
      en: 'Exhibition Walkthrough: "Materia & Silence" (1:12)'
    },
    type: 'walkthrough',
    duration: '1:12',
    thumbnailUrl: heroInstallationImg,
    year: 2024,
    description: {
      el: 'Κινηματογραφική περιήγηση στις αίθουσες της ατομικής έκθεσης με φυσικό φως και ηχητικό τοπίο.',
      en: 'Cinematic walk through the solo exhibition halls featuring natural daylight and ambient spatial audio.'
    }
  },
  {
    id: 'vid-03',
    title: {
      el: 'Video Art: "Ηχητικές Αντηχήσεις της Πέτρας" (0:36)',
      en: 'Video Art: "Resonances of Stone" (0:36)'
    },
    type: 'videoart',
    duration: '0:36',
    thumbnailUrl: abstractCanvasImg,
    year: 2023,
    description: {
      el: 'Πειραματικό video art έργο μικρής διάρκειας σε ανάθεση του Φεστιβάλ Ψηφιακών Τεχνών.',
      en: 'Short-form experimental fine art video commissioned for Digital Arts Festival.'
    }
  }
];

export const exhibitionsData: Exhibition[] = [
  { year: 2024, title: 'Materia & Silence (Ατομική)', venue: 'Μουσείο Σύγχρονων Μορφών', city: 'Αθήνα', type: 'solo' },
  { year: 2024, title: 'Art Fair Contemporary 2024', venue: 'Contemporary Art Pavilion', city: 'Αθήνα', type: 'group' },
  { year: 2023, title: 'Υλικά Ίχνη & Χώρος (Ατομική)', venue: 'Spatial Forms Gallery', city: 'Αθήνα', type: 'solo' },
  { year: 2023, title: 'New Forms / Mediterranean Tactility', venue: 'Project Space Horizon', city: 'Παρίσι', type: 'group' },
  { year: 2022, title: 'Biennale Νέας Εικαστικής Δημιουργίας', venue: 'Contemporary Arts Center', city: 'Μιλάνο', type: 'group' },
  { year: 2021, title: 'Αναδυόμενη Ύλη (Ατομική)', venue: 'Κέντρο Εικαστικής Έρευνας', city: 'Θεσσαλονίκη', type: 'solo' },
  { year: 2020, title: 'Μόνιμη Συλλογή: Πρόσφατες Αποκτήσεις', venue: 'Μουσείο Σύγχρονης Τέχνης', city: 'Αθήνα', type: 'group' }
];

export const awardsData: AwardItem[] = [
  { year: 2023, title: 'Βραβείο Σύγχρονης Εικαστικής Γλυπτικής', institution: 'Ίδρυμα Σύγχρονης Τέχνης & Έρευνας' },
  { year: 2022, title: 'Fellowship Σύγχρονης Δημιουργίας', institution: 'Πολιτιστικό Πρόγραμμα Υποτροφιών' },
  { year: 2020, title: 'Artist Residency Grant (6 μήνες)', institution: 'International Atelier Residencies, Paris' }
];

export const clientPitchPoints = [
  {
    num: '01',
    titleEl: 'Μοντέρνος & Minimal Σχεδιασμός',
    titleEn: 'Modern & Minimal Architecture',
    descEl: 'Έμφαση στα έργα χωρίς περιττά διακοσμητικά στοιχεία. Αρχιτεκτονική τυπογραφία, άπλετος λευκός χώρος, καθαρές διαστάσεις, τεχνικές και κατάσταση διαθεσιμότητας.',
    descEn: 'Focus on artworks without clutter. Architectural typography, generous white space, clean dimensions, medium specs, and availability status.'
  },
  {
    num: '02',
    titleEl: 'Ενσωμάτωση Video Art & Studio Reels',
    titleEn: 'Moving Image Integration',
    descEl: 'Ειδικά διαμορφωμένος video player για σύντομα video art, studio process time-lapses και περιηγήσεις εκθέσεων (walkthroughs) χωρίς αργό φόρτωμα.',
    descEn: 'Dedicated lightweight video player for video art, studio process time-lapses, and exhibition walkthroughs with zero page drag.'
  },
  {
    num: '03',
    titleEl: 'Ολοκληρωμένο CV & Inquiries',
    titleEn: 'Curated CV & Inquiries',
    descEl: 'Πλήρες καλλιτεχνικό statement, αναλυτικό χρονολόγιο εκθέσεων (Ατομικές / Ομαδικές), βραβεία, συλλογές και άμεση φόρμα εκδήλωσης ενδιαφέροντος για συγκεκριμένα έργα.',
    descEn: 'Full artist statement, categorized exhibition timeline (Solo / Group), awards, institutional collections, and direct inquiry link per artwork.'
  },
  {
    num: '04',
    titleEl: 'Προσαρμογή για Όλες τις Συσκευές',
    titleEn: 'Full Responsive Experience',
    descEl: 'Άψογη εμπειρία σε iPhone, Android και iPad. Οι επιμελητές (curators) και οι συλλέκτες βλέπουν τα έργα σε υψηλή ανάλυση οπουδήποτε και αν βρίσκονται.',
    descEn: 'Flawless experience on mobile and tablet. Curators and collectors can view artwork specs and high-res imagery on the go.'
  },
  {
    num: '05',
    titleEl: 'Εύκολη Διαχείριση Περιεχομένου',
    titleEn: 'Modern Content Management',
    descEl: '100% συμβατότητα με το ήδη υπάρχον domain και hosting σας (δεν απαιτείται αλλαγή παρόχου). Εύκολη προσθήκη νέων έργων, εκθέσεων και φωτογραφιών.',
    descEn: '100% compatible with existing domain and hosting (no hosting migration needed). Effortless updates for new artworks and exhibitions.'
  }
];

export { studioSpaceImg, heroInstallationImg, sculpturePedestalImg, abstractCanvasImg };
