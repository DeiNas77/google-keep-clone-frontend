import { useState, useRef } from "react";
import type { NoteCardProps } from "../types/Note";
import {
  ArchiveIcon,
  EllipsisVertical,
  RotateCcw,
  TrashIcon,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { colorNote } from "../types/colors";
import { ImportancePicker } from "./ImportancePicker";

export const NoteCard = ({ note }: NoteCardProps) => {
  const {
    archiveNote,
    unarchiveNote,
    trashNote,
    restoreNote,
    deleteNotePermanently,
    setSelectedNote,
  } = useAppContext();
  const { id, title, content, archived, trashed } = note;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const colorNoteImportance = colorNote[note.importance];

  const handleArchive = (id: string) => {
    if (archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
  };

  const handleTrash = (id: string) => {
    trashNote(id);
    setIsDropdownOpen(false);
  };

  const handleClick = () => {
    setSelectedNote(note);
  };

  return (
    <div
      className="border rounded-3xl min-h-16 wrap-break-word relative cursor-pointer hover:shadow-lg transition-shadow"
      style={{ borderColor: colorNoteImportance }}
      onClick={handleClick}
    >
      <p
        className="text-2xl font-semibold line-clamp-2 px-4 pt-2 pb-1"
        style={{ color: colorNoteImportance }}
      >
        {title}
      </p>
      <p
        className={`text-sm line-clamp-6 pl-4.5 pr-4 pb-2 ${title && content ? "pt-1" : "pt-2"}`}
        style={{ color: colorNoteImportance }}
      >
        {content}
      </p>
      <div
        className="flex justify-end px-4 pt-2 pb-3 gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {trashed ? (
          <>
            <button
              className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
              style={{ color: colorNoteImportance }}
              onClick={() => restoreNote(id)}
              title="Restaurar"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
              onClick={() => deleteNotePermanently(id)}
              title="Eliminar permanentemente"
            >
              <TrashIcon
                className="h-5 w-5"
                style={{ color: colorNoteImportance }}
              />
            </button>
          </>
        ) : (
          <>
            <ImportancePicker noteId={note.id} importance={note.importance} />
            <button
              className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
              onClick={() => handleArchive(id)}
            >
              <ArchiveIcon
                className="h-5 w-5"
                style={{ color: colorNoteImportance }}
              />
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <EllipsisVertical
                  className="h-5 w-5"
                  style={{ color: colorNoteImportance }}
                />
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-1 bg-(--primary-color) border rounded-lg shadow-lg z-50 min-w-[160px] overflow-hidden"
                  style={{ borderColor: colorNoteImportance }}
                >
                  <button
                    className="flex items-center w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors rounded-lg"
                    style={{ color: colorNoteImportance }}
                    onClick={() => handleTrash(id)}
                  >
                    Eliminar nota
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
