"use client";

import { SplashLayout } from "@/src/components/Layout/SplashLayout";
import { ArchiveIcon } from "lucide-react";
import { useAppContext } from "@/src/components/context/AppContext";
import { useAuth } from "@/src/components/context/AuthContext";
import { NoteCard } from "@/src/components/Note/NoteCard";
import { NoteModal } from "@/src/components/Note/NoteModal";
import { NoteGrid } from "@/src/components/common/NoteGrid";
import { SearchNoResults } from "@/src/components/common/SearchNoResults";
import { useMemo } from "react";
import { Pagination } from "@/src/components/common/Pagination";

export default function Archive() {
  const { page, totalPagesByView, setPage } = useAppContext();
  const { isGrid, notes, archivedNotes, selectedNote, debouncedQuery } =
    useAppContext();
  const { isLoggedIn } = useAuth();
  const isSearching = debouncedQuery.trim() !== "";

  const { archive: archivedNotesTotal } = totalPagesByView;

  const baseArchivedNotes = isLoggedIn
    ? archivedNotes
    : notes.filter((note) => note.archived && !note.trashed);

  const notesArchived = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();
    return baseArchivedNotes.filter((note) => {
      const matchQuery =
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query);
      return matchQuery;
    });
  }, [baseArchivedNotes, debouncedQuery]);

  return (
    <section className="w-full flex flex-col flex-1 h-full">
      {notesArchived.length > 0 ? (
        <NoteGrid isGrid={isGrid}>
          {notesArchived.map((note) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </NoteGrid>
      ) : isSearching && baseArchivedNotes.length > 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <SearchNoResults query={debouncedQuery} />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <SplashLayout
            icon={ArchiveIcon}
            text="Tus notas archivadas aparecerán aquí"
          />
        </div>
      )}
      {isLoggedIn && archivedNotesTotal > 1 && (
        <Pagination
          currentPage={page}
          totalPages={archivedNotesTotal}
          onPageChange={setPage}
        />
      )}
      {selectedNote && <NoteModal />}
    </section>
  );
}
