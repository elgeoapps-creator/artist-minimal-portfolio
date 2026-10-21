import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Τύπος Λειτουργίας Προσομοίωσης Συσκευής
 * - 'desktop': Πλήρης επιφάνεια εργασίας (100% width)
 * - 'tablet': Προσομοίωση οθόνης tablet (πλάτος 820px, 2 στήλες έργων)
 * - 'mobile': Προσομοίωση οθόνης κινητού (πλάτος 420px, 1 στήλη έργων)
 */
export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

/**
 * Διεπαφή Κατάστασης DeviceContext
 */
interface DeviceContextType {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  isMobile: boolean;  // true είτε αν έχει επιλεγεί προσομοίωση mobile είτε αν η πραγματική οθόνη είναι < 768px
  isTablet: boolean;  // true είτε αν έχει επιλεγεί προσομοίωση tablet είτε αν η πραγματική οθόνη είναι 768px - 1180px
  isDesktop: boolean; // true όταν προβάλλεται σε ευρεία οθόνη desktop
}

// Αρχικοποίηση του Context με προεπιλεγμένες τιμές
const DeviceContext = createContext<DeviceContextType>({
  deviceMode: 'desktop',
  setDeviceMode: () => {},
  isMobile: false,
  isTablet: false,
  isDesktop: true,
});

/**
 * DeviceProvider: Πάροχος Πλαισίου Απόκρισης Συσκευών
 * -------------------------------------------------------------
 * Επιτρέπει στον χρήστη ή πελάτη να αλλάζει κατά βούληση την προβολή
 * (Desktop / Tablet / Mobile) από την επάνω μπάρα, ενώ ταυτόχρονα
 * παρακολουθεί δυναμικά το πραγματικό πλάτος του παραθύρου (window resize)
 * ώστε να υπάρχει πλήρης συμβατότητα τόσο στην προσομοίωση όσο και σε αληθινές συσκευές.
 */
export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Επιλεγμένη λειτουργία προσομοίωσης από τα κουμπιά του Top Bar
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');

  // Πραγματικό πλάτος οθόνης browser σε pixels
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Παρακολούθηση αλλαγής μεγέθους παραθύρου (Responsive Resize Listener)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Υπολογισμός πραγματικών ορίων οθόνης (breakpoints)
  const isRealMobile = windowWidth < 768;
  const isRealTablet = windowWidth >= 768 && windowWidth < 1180;

  // Συνδυαστικός υπολογισμός: αν ο χρήστης επέλεξε ρητά mobile/tablet, υπερισχύει η προσομοίωση
  const isMobile = deviceMode === 'mobile' || (deviceMode === 'desktop' && isRealMobile);
  const isTablet =
    deviceMode === 'tablet' || (deviceMode === 'desktop' && isRealTablet && !isRealMobile);
  const isDesktop = !isMobile && !isTablet;

  return (
    <DeviceContext.Provider
      value={{
        deviceMode,
        setDeviceMode,
        isMobile,
        isTablet,
        isDesktop,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

/**
 * Custom Hook useDevice: Παρέχει άμεση πρόσβαση στην κατάσταση συσκευής σε οποιοδήποτε component
 */
export const useDevice = () => useContext(DeviceContext);
