interface NoteGridProps {
  children: React.ReactNode;
  isGrid: boolean;
}

export const NoteGrid = ({ children, isGrid }: NoteGridProps) => {
  return (
    <section
      className={
        isGrid
          ? "grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 items-start my-7 mx-5"
          : "flex flex-col w-full max-w-xl mx-auto mt-5 gap-5"
      }
    >
      {children}
    </section>
  );
};
