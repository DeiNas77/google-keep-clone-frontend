"use client";

import { SplashLayout } from "../Layout/SplashLayout";
import { NoteInput } from "./NoteInput";
import { Lightbulb } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { NoteList } from "../Note/NoteList";
import { NoteModal } from "./NoteModal";
import { Pagination } from "../common/Pagination";
import { useAuth } from "../context/AuthContext";

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

  const notesActive = notes.filter((note) => !note.archived && !note.trashed);
  const isSearching = debouncedQuery.trim() !== "";

  return (
    <section className="w-full flex flex-col flex-1 h-full">
      <NoteInput />

      {notesActive.length > 0 || isSearching ? (
        <NoteList />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <SplashLayout
            icon={Lightbulb}
            text={`Las notas que agregues aparecerán aquí`}
          />
        </div>
      )}

      {isLoggedIn && homeTotalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={homeTotalPages}
          onPageChange={setPage}
        />
      )}
      {selectedNote && <NoteModal />}
    </section>
  );
};
