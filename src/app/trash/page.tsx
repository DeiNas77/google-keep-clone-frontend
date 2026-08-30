"use client";

import { SplashLayout } from "@/src/components/Layout/SplashLayout";
import { Trash } from "lucide-react";
import { useAppContext } from "@/src/components/context/AppContext";
import { NoteCard } from "@/src/components/Note/NoteCard";
import { NoteModal } from "@/src/components/Note/NoteModal";
import { NoteGrid } from "@/src/components/common/NoteGrid";
import { SearchNoResults } from "@/src/components/common/SearchNoResults";
import { TrashIcon } from "lucide-react";
import { useMemo } from "react";

export default function TrashPage() {
  const { isGrid, notes, emptyTrash, selectedNote, debouncedQuery } =
    useAppContext();
  const isSearching = debouncedQuery.trim() !== "";

  const baseTrashedNotes = notes.filter(
    (note) => note.trashed && !note.archived,
  );

  const trashedNotes = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();
    return baseTrashedNotes.filter((note) => {
      const matchQuery =
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query);
      return matchQuery;
    });
  }, [debouncedQuery, baseTrashedNotes]);

  return (
    <section className="w-full flex flex-col flex-1 h-full">
      <section className="flex items-center justify-center gap-4 my-7">
        <h1 className="text-lg text-center">
          Las notas de la papelera se borran después de 7 días.
        </h1>
        {baseTrashedNotes.length > 0 && (
          <button
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer transition-colors flex items-center gap-2"
            onClick={emptyTrash}
          >
            <TrashIcon className="h-4 w-4" />
            Vaciar papelera
          </button>
        )}
      </section>

      {trashedNotes.length > 0 ? (
        <NoteGrid isGrid={isGrid}>
          {trashedNotes.map((note) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </NoteGrid>
      ) : isSearching && baseTrashedNotes.length > 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <SearchNoResults query={debouncedQuery} />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <SplashLayout icon={Trash} text="No hay notas en la papelera" />
        </div>
      )}

      {selectedNote && <NoteModal />}
    </section>
  );
}
