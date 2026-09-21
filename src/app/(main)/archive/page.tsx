"use client";

import { SplashLayout } from "@/src/components/Layout/SplashLayout";
import { ArchiveIcon } from "lucide-react";
import { useAppContext } from "@/src/components/context/AppContext";
import { useAuth } from "@/src/components/context/AuthContext";
import { NoteCard } from "@/src/components/Note/NoteCard";
import { NoteModal } from "@/src/components/Note/NoteModal";
import { NoteGrid } from "@/src/components/common/NoteGrid";
import { SearchNoResults } from "@/src/components/common/SearchNoResults";
import { useMemo, useEffect } from "react";
import { Pagination } from "@/src/components/common/Pagination";
import { MAX_PER_PAGE } from "@/src/constant";
import { paginate } from "@/src/helper/paginate";

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

  const totalPages = isLoggedIn
    ? archivedNotesTotal
    : Math.max(1, Math.ceil(notesArchived.length / MAX_PER_PAGE));

  const noteArchivedToDisplay = isLoggedIn
    ? notesArchived
    : paginate(notesArchived, page, MAX_PER_PAGE).paginatedItems;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages, setPage]);

  return (
    <section className="w-full flex flex-col flex-1 h-full">
      {notesArchived.length > 0 ? (
        <NoteGrid isGrid={isGrid}>
          {noteArchivedToDisplay.map((note) => (
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
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      {selectedNote && <NoteModal />}
    </section>
  );
}
