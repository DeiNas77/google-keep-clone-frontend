"use client";

import { SplashLayout } from "@/src/components/Layout/SplashLayout";
import { ArchiveIcon } from "lucide-react";
import { useAppContext } from "@/src/components/context/AppContext";
import { NoteCard } from "@/src/components/Note/NoteCard";
import { NoteModal } from "@/src/components/Note/NoteModal";
import { NoteGrid } from "@/src/components/common/NoteGrid";

export default function Archive() {
  const { isGrid, notes, selectedNote } = useAppContext();

  const notesArchived = notes.filter((note) => note.archived && !note.trashed);

  return (
    <section className="w-full flex flex-col flex-1 h-full">
      {notesArchived.length > 0 ? (
        <NoteGrid isGrid={isGrid}>
          {notesArchived.map((note) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </NoteGrid>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <SplashLayout
            icon={ArchiveIcon}
            text="Tus notas archivadas aparecerán aquí"
          />
        </div>
      )}

      {selectedNote && <NoteModal />}
    </section>
  );
}
