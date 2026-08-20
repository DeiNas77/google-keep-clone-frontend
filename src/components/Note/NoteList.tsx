import { useAppContext } from "../context/AppContext";
import { NoteCard } from "../Note/NoteCard";

export const NoteList = () => {
  const { isGrid, notes } = useAppContext();

  return (
    <section
      className={
        isGrid
          ? "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start my-7 mx-5"
          : "flex flex-col w-full max-w-xl mx-auto mt-5 gap-5"
      }
    >
      {notes.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </section>
  );
};
