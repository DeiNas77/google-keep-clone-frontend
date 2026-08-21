// context/AppContext.tsx
"use client";
import { createContext, useContext, useState } from "react";
import type { Note } from "../types/Note";

interface AppContextProps {
  notes: Note[];
  addNote: (note: Note) => void;
  archiveNote: (id: string) => void;
  unarchiveNote: (id: string) => void;
  isGrid: boolean;
  toggleGrid: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const addNote = (note: Note) => setNotes((prev) => [note, ...prev]);
  const toggleGrid = () => setIsGrid((prev) => !prev);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const archiveNote = (id: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, archived: true } : note)),
    );
  };

  const unarchiveNote = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, archived: false } : note,
      ),
    );
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        addNote,
        archiveNote,
        unarchiveNote,
        isGrid,
        toggleGrid,
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
