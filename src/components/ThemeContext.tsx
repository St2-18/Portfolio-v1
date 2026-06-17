import React, { createContext, useContext, useState, useLayoutEffect, useCallback } from 'react';

export type PaletteId = 'void-purple' | 'cyber-teal' | 'solar-amber' | 'neon-rose' | 'matrix-green' | 'carbon-onyx' | 'cream-latte';

export interface PaletteInfo {
  id: PaletteId;
  name: string;
  primary: string;
  accent: string;
}

export const PALETTES: PaletteInfo[] = [
  { id: 'void-purple', name: 'Void Purple', primary: 'hsl(260, 84%, 65%)', accent: 'hsl(200, 84%, 60%)' },
  { id: 'cyber-teal', name: 'Cyber Teal', primary: 'hsl(175, 84%, 45%)', accent: 'hsl(220, 80%, 55%)' },
  { id: 'solar-amber', name: 'Solar Amber', primary: 'hsl(35, 95%, 55%)', accent: 'hsl(15, 90%, 55%)' },
  { id: 'neon-rose', name: 'Neon Rose', primary: 'hsl(330, 85%, 60%)', accent: 'hsl(280, 75%, 55%)' },
  { id: 'matrix-green', name: 'Matrix Green', primary: 'hsl(140, 80%, 50%)', accent: 'hsl(170, 70%, 45%)' },
  { id: 'carbon-onyx', name: 'Carbon Onyx', primary: 'hsl(0, 0%, 85%)', accent: 'hsl(0, 0%, 55%)' },
  { id: 'cream-latte', name: 'Cream Latte', primary: 'hsl(25, 50%, 35%)', accent: 'hsl(35, 40%, 70%)' },
];

interface PaletteContextType {
  palette: PaletteId;
  setPalette: (id: PaletteId) => void;
  palettes: PaletteInfo[];
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export const PaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [palette, setPaletteState] = useState<PaletteId>(() => {
    try {
      const stored = localStorage.getItem('portfolio-palette');
      if (stored && PALETTES.some(p => p.id === stored)) {
        return stored as PaletteId;
      }
    } catch {
      // localStorage may be unavailable
    }
    return 'cyber-teal';
  });

  const setPalette = useCallback((id: PaletteId) => {
    setPaletteState(id);
    try {
      localStorage.setItem('portfolio-palette', id);
    } catch {
      // Silently fail if localStorage is full or unavailable
    }
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-palette', palette);

    // Brief transition class for smooth palette switch
    root.classList.add('palette-transitioning');
    const timeout = setTimeout(() => {
      root.classList.remove('palette-transitioning');
    }, 500);

    return () => clearTimeout(timeout);
  }, [palette]);

  return (
    <PaletteContext.Provider value={{ palette, setPalette, palettes: PALETTES }}>
      {children}
    </PaletteContext.Provider>
  );
};

export const usePalette = (): PaletteContextType => {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context;
};
