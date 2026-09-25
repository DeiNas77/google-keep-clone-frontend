import { NoteCard } from "@/src/components/Note/NoteCard";
import { NoteGrid } from "@/src/components/common/NoteGrid";
import { SearchNoResults } from "@/src/components/common/SearchNoResults";
import { useAppContext } from "@/src/components/context/AppContext";
import { paginate } from "@/src/helper/paginate";
import { useAuth } from "../context/AuthContext";
import { MAX_PER_PAGE } from "@/src/constant";
import type { Note } from "@/src/components/types/Note";

interface NoteListProps {
  notesActive: Note[];
}

export const NoteList = ({ notesActive }: NoteListProps) => {
  const { isLoggedIn } = useAuth();
  const { isGrid, debouncedQuery, page } = useAppContext();
  const isSearching = debouncedQuery.trim() !== "";

  const notesToDisplay = isLoggedIn
    ? notesActive
    : paginate(notesActive, page, MAX_PER_PAGE).paginatedItems;

  if (notesActive.length === 0 && isSearching) {
    return <SearchNoResults query={debouncedQuery} />;
  }

  return (
    <NoteGrid isGrid={isGrid}>
      {notesToDisplay.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </NoteGrid>
  );
};
