"use client";

import { SplashLayout } from "@/src/components/Layout/SplashLayout";
import { ArchiveIcon } from "lucide-react";
import { useAppContext } from "../../components/context/AppContext";
import { NoteCard } from "../../components/Note/NoteCard";

export default function Archive() {
  const { isGrid, notes } = useAppContext();

  const notesArchived = notes.filter((note) => note.archived);

  return (
    <section className="w-full flex flex-col flex-1 h-full">
      {notesArchived.length > 0 ? (
        <section
          className={
            isGrid
              ? "grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 items-start my-7 mx-5"
              : "flex flex-col w-full max-w-xl mx-auto mt-5 gap-5"
          }
        >
          {notesArchived.map((note) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </section>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <SplashLayout
            icon={ArchiveIcon}
            text={`Tus notas archivadas apareceran aquí`}
          />
        </div>
      )}
    </section>
  );
}
