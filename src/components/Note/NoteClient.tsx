"use client";

import { SplashLayout } from "../Layout/SplashLayout";
import { NoteInput } from "./NoteInput";
import { Lightbulb } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { NoteList } from "../Note/NoteList";

export const NoteClient = () => {
  const { notes } = useAppContext();

  const notesActive = notes.filter((note) => !note.archived);

  return (
    <section className="w-full flex flex-col flex-1 h-full">
      <NoteInput />

      {notesActive.length > 0 ? (
        <NoteList />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <SplashLayout
            icon={Lightbulb}
            text={`Las notas que agregues aparecerán aquí`}
          />
        </div>
      )}
    </section>
  );
};
