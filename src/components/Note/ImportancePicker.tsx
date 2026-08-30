"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import {
  colorNote,
  importanceLabels,
  type noteColorsImportant,
} from "../types/colors";

interface ImportancePickerProps {
  noteId: string;
  importance: noteColorsImportant;
  onSelect?: (level: noteColorsImportant) => void;
}

export const ImportancePicker = ({
  noteId,
  importance,
  onSelect,
}: ImportancePickerProps) => {
  const { updateImportance } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useClickOutside(pickerRef, () => setIsOpen(false));

  const handleSelect = (level: noteColorsImportant) => {
    updateImportance(noteId, level);
    onSelect?.(level);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
        title="Nivel de importancia"
        aria-label="Nivel de importancia"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="block h-4 w-4 rounded-full"
          style={{ backgroundColor: colorNote[importance] }}
        />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 bg-(--primary-color) border rounded-lg shadow-lg z-50 min-w-[160px] overflow-hidden"
          role="menu"
        >
          {(Object.keys(colorNote) as noteColorsImportant[]).map((level) => (
            <button
              key={level}
              type="button"
              role="menuitem"
              className="flex items-center w-full gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors rounded-lg"
              onClick={() => handleSelect(level)}
            >
              <span
                className="h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: colorNote[level] }}
              />
              {importanceLabels[level]}
              {level === importance && <Check className="h-4 w-4 ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};