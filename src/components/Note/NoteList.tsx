import { useAppContext } from "../context/AppContext";
import { NoteCard } from "../Note/NoteCard";

export const NoteList = () => {
  const { isGrid, notes } = useAppContext();

  const notesPrincipal = notes.filter((note) => !note.archived);

  return (
    <section
      className={
        isGrid
          ? "grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 items-start my-7 mx-5"
          : "flex flex-col w-full max-w-xl mx-auto mt-5 gap-5"
      }
    >
      {notesPrincipal.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </section>
  );
};
