"use client";

import { useMemo, useEffect } from "react";
import { SplashLayout } from "../Layout/SplashLayout";
import { NoteInput } from "./NoteInput";
import { Lightbulb } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { NoteList } from "../Note/NoteList";
import { NoteModal } from "./NoteModal";
import { GuestNoticeModal } from "./GuestNoticeModal";
import { Pagination } from "../common/Pagination";
import { useAuth } from "../context/AuthContext";
import { MAX_PER_PAGE } from "@/src/constant";

export const NoteClient = () => {
  const {
    notes,
    selectedNote,
    debouncedQuery,
    page,
    setPage,
    totalPagesByView,
  } = useAppContext();

  const { home: homeTotalPages } = totalPagesByView;
  const { isLoggedIn } = useAuth();
  const isSearching = debouncedQuery.trim() !== "";

  const notesActive = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();

    return notes.filter((note) => {
      const matchesState = !note.archived && !note.trashed;
      const matchesSearch =
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query);

      return matchesState && matchesSearch;
    });
  }, [notes, debouncedQuery]);

  const totalPages = isLoggedIn
    ? homeTotalPages
    : Math.max(1, Math.ceil(notesActive.length / MAX_PER_PAGE));

  // Clamping: avoids ghost page when notes are deleted or search narrows results
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages, setPage]);

  return (
    <section className="w-full flex flex-col flex-1 h-full">
      <NoteInput />

      {notesActive.length > 0 || isSearching ? (
        <NoteList notesActive={notesActive} />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <SplashLayout
            icon={Lightbulb}
            text={`Las notas que agregues aparecerán aquí`}
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
      <GuestNoticeModal />
    </section>
  );
};
