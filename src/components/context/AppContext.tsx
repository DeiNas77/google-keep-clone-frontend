// context/AppContext.tsx
"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Note } from "../types/Note";
import { useDebounce } from "@/src/hooks/useDebounce";
import type { noteColorsImportant } from "../types/colors";
import { LOCAL_STORAGE_KEYS } from "@/src/constant";
import { getInitialNotes } from "@/src/helper/getInitialNotes";
import googleKeepApi from "@/src/http/googleKeepApi";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface AppContextProps {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, title: string, content: string) => void;
  archiveNote: (id: string) => void;
  unarchiveNote: (id: string) => void;
  trashNote: (id: string) => void;
  restoreNote: (id: string) => void;
  deleteNotePermanently: (id: string) => void;
  emptyTrash: () => void;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  isGrid: boolean;
  toggleGrid: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedQuery: string;
  updateImportance: (id: string, importance: noteColorsImportant) => void;
  syncPendingNotes: () => Promise<void>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { isLoggedIn } = useAuth();
  const hasAutoSynced = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotes(getInitialNotes());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(LOCAL_STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes, isHydrated]);

  const toggleGrid = () => setIsGrid((prev) => !prev);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const addNote = (note: Note) => {
    setNotes((prev) => [
      { ...note, stateNote: note.stateNote ?? "pending" },
      ...prev,
    ]);
    toast.success("Nota creada");
  };

  const updateNote = (id: string, title: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, title, content } : note)),
    );
  };

  const archiveNote = (id: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, archived: true } : note)),
    );
    toast.success("Nota archivada");
  };

  const unarchiveNote = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, archived: false } : note,
      ),
    );
    toast.success("Nota desarchivada");
  };

  const trashNote = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, trashed: true, archived: false } : note,
      ),
    );
    toast.success("Nota movida a la papelera");
  };

  const emptyTrash = () => {
    setNotes((prev) => prev.filter((n) => !n.trashed));
    toast.success("Papelera vaciada");
  };

  const deleteNotePermanently = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    toast.success("Nota eliminada");
  };

  const restoreNote = (id: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, trashed: false } : note)),
    );
    toast.success("Nota restaurada");
  };

  const updateImportance = (id: string, importance: noteColorsImportant) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, importance } : note)),
    );
  };

  const syncPendingNotes = async () => {
    const pendingNotes = notes.filter((note) => note.stateNote === "pending");
    if (pendingNotes.length === 0) return;

    let updatedNotes = [...notes];
    let syncedCount = 0;

    for (const pendingNote of pendingNotes) {
      const response = await googleKeepApi.CreateNotes(
        pendingNote.title,
        pendingNote.content,
        pendingNote.archived,
        pendingNote.trashed,
        pendingNote.importance,
      );

      if (response.data) {
        const syncedNote = { ...response.data, stateNote: "synced" as const };
        updatedNotes = updatedNotes.map((note) =>
          note.id === pendingNote.id ? syncedNote : note,
        );
        setSelectedNote((current) =>
          current?.id === pendingNote.id ? syncedNote : current,
        );
        syncedCount++;
      }
    }

    setNotes(updatedNotes);

    if (syncedCount > 0) {
      toast.success(`Notas sincronizadas (${syncedCount})`);
    }
  };

  useEffect(() => {
    if (!isHydrated || !isLoggedIn) return;
    if (hasAutoSynced.current) return;
    hasAutoSynced.current = true;
    syncPendingNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, isLoggedIn]);

  return (
    <AppContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
        archiveNote,
        unarchiveNote,
        trashNote,
        deleteNotePermanently,
        emptyTrash,
        restoreNote,
        selectedNote,
        setSelectedNote,
        isGrid,
        toggleGrid,
        isSidebarOpen,
        toggleSidebar,
        searchQuery,
        setSearchQuery,
        debouncedQuery,
        updateImportance,
        syncPendingNotes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
