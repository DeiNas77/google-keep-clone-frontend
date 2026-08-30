import { useMemo } from "react";
import { NoteCard } from "@/src/components/Note/NoteCard";
import { NoteGrid } from "@/src/components/common/NoteGrid";
import { SearchNoResults } from "@/src/components/common/SearchNoResults";
import { useAppContext } from "@/src/components/context/AppContext";

export const NoteList = () => {
  const { isGrid, notes, debouncedQuery } = useAppContext();
  const isSearching = debouncedQuery.trim() !== "";

  const notesPrincipal = useMemo(() => {
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

  if (notesPrincipal.length === 0 && isSearching) {
    return <SearchNoResults query={debouncedQuery} />;
  }

  return (
    <NoteGrid isGrid={isGrid}>
      {notesPrincipal.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </NoteGrid>
  );
};
