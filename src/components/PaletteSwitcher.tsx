import { useState, useRef, useEffect, memo } from 'react';
import { Palette } from 'lucide-react';
import { usePalette } from './ThemeContext';

const PaletteSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { palette, setPalette, palettes } = usePalette();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 left-8 z-50" ref={panelRef}>
      {/* Palette swatches popover */}
      <div
        className={`absolute bottom-16 left-0 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="clay-card p-3 min-w-[180px]">
          <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground font-semibold px-2 mb-2">
            Theme
          </p>
          <div className="space-y-1">
            {palettes.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPalette(p.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-2.5 py-2 rounded-lg transition-all duration-200 hover:bg-white/5 group ${
                  palette === p.id ? 'bg-white/[0.07]' : ''
                }`}
                aria-label={`Switch to ${p.name} theme`}
              >
                <div
                  className={`w-7 h-7 rounded-full shrink-0 transition-all duration-200 group-hover:scale-110 ${
                    palette === p.id
                      ? 'ring-2 ring-white/70 ring-offset-2 ring-offset-card scale-110'
                      : 'ring-1 ring-white/10'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${p.primary}, ${p.accent})`,
                  }}
                />
                <span
                  className={`text-xs font-medium whitespace-nowrap transition-colors ${
                    palette === p.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative p-3.5 rounded-full clay-btn flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? 'rotate-[30deg]' : ''
        }`}
        aria-label="Change color palette"
      >
        <Palette className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
      </button>
    </div>
  );
};

export default memo(PaletteSwitcher);
