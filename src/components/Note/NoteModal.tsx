"use client";

import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/src/components/context/AppContext";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import {
  ArchiveIcon,
  EllipsisVertical,
  RotateCcw,
  TrashIcon,
} from "lucide-react";
import { colorNote } from "../types/colors";
import { ImportancePicker } from "./ImportancePicker";

export const NoteModal = () => {
  const {
    selectedNote,
    setSelectedNote,
    updateNote,
    archiveNote,
    unarchiveNote,
    trashNote,
    restoreNote,
    deleteNotePermanently,
  } = useAppContext();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const note = selectedNote;

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const hasFocused = useRef(false);

  useEffect(() => {
    if (contentRef.current && note && !hasFocused.current) {
      contentRef.current.focus();
      const length = contentRef.current.value.length;
      contentRef.current.setSelectionRange(length, length);
      hasFocused.current = true;
    }
    if (!note) {
      hasFocused.current = false;
    }
  }, [note]);

  if (!note) return null;

  const colorNoteImportance = colorNote[note.importance];

  const handleSaveAndClose = () => {
    updateNote(note.id, note.title, note.content);
    setSelectedNote(null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNote({ ...note, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedNote({ ...note, content: e.target.value });
  };

  const handleArchive = () => {
    if (note.archived) {
      unarchiveNote(note.id);
    } else {
      archiveNote(note.id);
    }
    setSelectedNote(null);
  };

  const handleRestore = () => {
    restoreNote(note.id);
    setSelectedNote(null);
  };

  const handleDeletePermanently = () => {
    deleteNotePermanently(note.id);
    setSelectedNote(null);
  };

  const handleTrash = () => {
    trashNote(note.id);
    setSelectedNote(null);
  };

  return (
    <section
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleSaveAndClose}
    >
      <div
        className="bg-(--primary-color) border rounded-3xl w-full max-w-2xl mx-4 shadow-xl cursor-default min-h-16"
        style={{ borderColor: colorNoteImportance }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          value={note.title}
          onChange={handleTitleChange}
          className="w-full text-2xl font-semibold bg-transparent px-5 pt-3 pb-1 outline-none"
          style={{ color: colorNoteImportance }}
          placeholder="Título"
        />
        <textarea
          ref={contentRef}
          value={note.content}
          onChange={handleContentChange}
          className="w-full min-h-[150px] text-sm bg-transparent px-5 pb-2 outline-none resize-none"
          style={{ color: colorNoteImportance }}
          placeholder="Tomar una nota..."
        />
        <div className="flex justify-end px-4 pt-2 pb-3 gap-2">
          {note.trashed ? (
            <>
              <button
                className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
                style={{ color: colorNoteImportance }}
                onClick={handleRestore}
                title="Restaurar"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
                onClick={handleDeletePermanently}
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
              <ImportancePicker
                noteId={note.id}
                importance={note.importance}
                onSelect={(level) =>
                  setSelectedNote({ ...note, importance: level })
                }
              />
              <button
                className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
                onClick={handleArchive}
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
                      onClick={handleTrash}
                      style={{
                        color: colorNoteImportance,
                      }}
                    >
                      Eliminar nota
                    </button>
                  </div>
                )}
              </div>
              <button
                className="px-3 py-2 text-sm rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                style={{ color: colorNoteImportance }}
                onClick={handleSaveAndClose}
              >
                Cerrar nota
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
