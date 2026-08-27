import { NoteCard } from "@/src/components/Note/NoteCard";
import { NoteGrid } from "@/src/components/common/NoteGrid";
import { useAppContext } from "@/src/components/context/AppContext";

export const NoteList = () => {
  const { isGrid, notes } = useAppContext();

  const notesPrincipal = notes.filter(
    (note) => !note.archived && !note.trashed,
  );

  return (
    <NoteGrid isGrid={isGrid}>
      {notesPrincipal.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </NoteGrid>
  );
};
