// context/AppContext.tsx
"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Note } from "../types/Note";
import { useDebounce } from "@/src/hooks/useDebounce";
import { LOCAL_STORAGE_KEYS } from "@/src/constant";
import { getInitialNotes } from "@/src/helper/getInitialNotes";
import { applyGuestNoteUpdate } from "@/src/helper/applyGuestNoteUpdate";
import googleKeepApi from "@/src/http/googleKeepApi";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface AppContextProps {
  notes: Note[];
  archivedNotes: Note[];
  trashedNotes: Note[];
  addNote: (note: Note) => void;
  updateNote: (
    id: string,
    updates: Partial<Omit<Note, "stateNote">>,
  ) => Promise<string | null>;
  archiveNote: (id: string) => void;
  unarchiveNote: (id: string) => void;
  trashNote: (id: string) => void;
  restoreNote: (id: string) => void;
  deleteNoteById: (id: string) => void;
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
  syncPendingNotes: () => Promise<void>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([]);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { isLoggedIn } = useAuth();
  const hasAutoSynced = useRef(false);
  const prevLoggedIn = useRef(isLoggedIn);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotes(getInitialNotes());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (isLoggedIn) return;
    localStorage.setItem(LOCAL_STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes, isHydrated, isLoggedIn]);

  useEffect(() => {
    if (prevLoggedIn.current && !isLoggedIn) {
      setNotes(getInitialNotes());
      setArchivedNotes([]);
      setTrashedNotes([]);
      setSelectedNote(null);
    }
    prevLoggedIn.current = isLoggedIn;
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isHydrated || !isLoggedIn) return;
    if (hasAutoSynced.current) return;
    hasAutoSynced.current = true;
    loadRemoteNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, isLoggedIn]);

  const toggleGrid = () => setIsGrid((prev) => !prev);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const upsertInto = (
    setter: React.Dispatch<React.SetStateAction<Note[]>>,
    note: Note,
  ) => {
    setter((prev) => {
      const exists = prev.some((existing) => existing.id === note.id);
      if (exists) {
        return prev.map((existing) =>
          existing.id === note.id ? note : existing,
        );
      }
      return [note, ...prev];
    });
  };

  const updateIn = (
    setter: React.Dispatch<React.SetStateAction<Note[]>>,
    note: Note,
  ) => setter((prev) => prev.map((n) => (n.id === note.id ? note : n)));

  const removeFrom = (
    setter: React.Dispatch<React.SetStateAction<Note[]>>,
    id: string,
  ) => {
    setter((prev) => prev.filter((note) => note.id !== id));
  };

  const addNote = async (note: Note) => {
    if (isLoggedIn) {
      try {
        const response = await googleKeepApi.CreateNotes(
          note.title,
          note.content,
          note.archived,
          note.trashed,
          note.importance,
        );
        if (response.data) {
          const createNotes = {
            ...response.data,
            stateNote: "synced" as const,
          };
          upsertInto(setNotes, createNotes);
          toast.success(response.message || "Nota creada");
        }
      } catch {
        /* handleError already toasts the backend error */
      }
    } else {
      applyGuestNoteUpdate(
        setNotes,
        (prev) => [
          { ...note, stateNote: note.stateNote ?? "pending" },
          ...prev,
        ],
        "Nota creada",
      );
    }
  };

  const updateNote = async (
    id: string,
    updates: Partial<Omit<Note, "stateNote">>,
  ): Promise<string | null> => {
    if (isLoggedIn) {
      try {
        const response = await googleKeepApi.UpdateNotes(id, updates);
        if (response.data) {
          const updatedNote = {
            ...response.data,
            stateNote: "synced" as const,
          };
          updateIn(setNotes, updatedNote);
          updateIn(setArchivedNotes, updatedNote);
          updateIn(setTrashedNotes, updatedNote);
          return response.message || "Nota actualizada";
        }
        return null;
      } catch {
        // handleError already toasts the backend error
        return null;
      }
    } else {
      return applyGuestNoteUpdate(
        setNotes,
        (prev) =>
          prev.map((note) => (note.id === id ? { ...note, ...updates } : note)),
        "Nota actualizada",
        { toastOnSuccess: false },
      );
    }
  };

  const archiveNote = async (id: string) => {
    if (isLoggedIn) {
      try {
        const response = await googleKeepApi.UpdateNotes(id, {
          archived: true,
        });
        if (response.data) {
          const noteArchive = {
            ...response.data,
            stateNote: "synced" as const,
          };
          removeFrom(setNotes, id);
          upsertInto(setArchivedNotes, noteArchive);
          toast.success(response.message || "Nota archivada");
        }
      } catch {
        /* handleError already toasts the backend error */
      }
    } else {
      applyGuestNoteUpdate(
        setNotes,
        (prev) =>
          prev.map((note) =>
            note.id === id ? { ...note, archived: true } : note,
          ),
        "Nota archivada",
      );
    }
  };

  const unarchiveNote = async (id: string) => {
    if (isLoggedIn) {
      try {
        const response = await googleKeepApi.UpdateNotes(id, {
          archived: false,
        });
        if (response.data) {
          const unarchiveNotes = {
            ...response.data,
            stateNote: "synced" as const,
          };
          removeFrom(setArchivedNotes, id);
          upsertInto(setNotes, unarchiveNotes);
          toast.success(response.message || "Nota desarchivada");
        }
      } catch {
        /* handleError already toasts the backend error */
      }
    } else {
      applyGuestNoteUpdate(
        setNotes,
        (prev) =>
          prev.map((note) =>
            note.id === id ? { ...note, archived: false } : note,
          ),
        "Nota desarchivada",
      );
    }
  };

  const trashNote = async (id: string) => {
    if (isLoggedIn) {
      try {
        const response = await googleKeepApi.UpdateNotes(id, {
          trashed: true,
          archived: false,
        });
        if (response.data) {
          const trashNotes = {
            ...response.data,
            stateNote: "synced" as const,
          };
          removeFrom(setNotes, id);
          removeFrom(setArchivedNotes, id);
          upsertInto(setTrashedNotes, trashNotes);
          toast.success(response.message || "Nota en la papelera");
        }
      } catch {
        /* handleError already toasts the backend error */
      }
    } else {
      applyGuestNoteUpdate(
        setNotes,
        (prev) =>
          prev.map((note) =>
            note.id === id ? { ...note, trashed: true, archived: false } : note,
          ),
        "Nota movida a la papelera",
      );
    }
  };

  const emptyTrash = async () => {
    if (isLoggedIn) {
      try {
        const response = await googleKeepApi.DeleteTrashedNotes();
        if (response.data) {
          setNotes((prev) => prev.filter((n) => !n.trashed));
          setTrashedNotes([]);
          toast.success(response.message || "Papelera vaciada");
        }
      } catch {
        /* handleError already toasts the backend error */
      }
    } else {
      applyGuestNoteUpdate(
        setNotes,
        (prev) => prev.filter((n) => !n.trashed),
        "Papelera vaciada",
      );
    }
  };

  const deleteNoteById = async (id: string) => {
    if (isLoggedIn) {
      try {
        const response = await googleKeepApi.DeleteNoteById(id);
        if (response.data) {
          removeFrom(setTrashedNotes, id);
          removeFrom(setNotes, id);
          removeFrom(setArchivedNotes, id);
          toast.success(response.message || "Nota eliminada");
        }
      } catch {
        /* handleError already toasts the backend error */
      }
    } else {
      applyGuestNoteUpdate(
        setNotes,
        (prev) => prev.filter((n) => n.id !== id),
        "Nota eliminada",
      );
    }
  };

  const restoreNote = async (id: string) => {
    if (isLoggedIn) {
      try {
        const response = await googleKeepApi.UpdateNotes(id, {
          trashed: false,
        });
        if (response.data) {
          const restoredNote = {
            ...response.data,
            stateNote: "synced" as const,
          };
          removeFrom(setTrashedNotes, id);
          upsertInto(setNotes, restoredNote);
          toast.success(response.message || "Nota restaurada");
        }
      } catch {
        /* handleError already toasts the backend error */
      }
    } else {
      applyGuestNoteUpdate(
        setNotes,
        (prev) =>
          prev.map((note) =>
            note.id === id ? { ...note, trashed: false } : note,
          ),
        "Nota restaurada",
      );
    }
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

    const stillPending = updatedNotes.filter(
      (note) => note.stateNote === "pending",
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.NOTES,
      JSON.stringify(stillPending),
    );

    if (syncedCount > 0) {
      toast.success(`Notas sincronizadas (${syncedCount})`);
    }
  };

  const loadRemoteNotes = async () => {
    await syncPendingNotes();
    const [homeResponse, archivedResponse, trashResponse] = await Promise.all([
      googleKeepApi.GetNotes({ archived: false, trashed: false }),
      googleKeepApi.GetNotes({ archived: true, trashed: false }),
      googleKeepApi.GetNotes({ trashed: true, archived: false }),
    ]);
    if (homeResponse.data) {
      setNotes(
        homeResponse.data.notes.map((note) => ({
          ...note,
          stateNote: "synced" as const,
        })),
      );
    }
    if (archivedResponse.data) {
      setArchivedNotes(
        archivedResponse.data.notes.map((note) => ({
          ...note,
          stateNote: "synced" as const,
        })),
      );
    }
    if (trashResponse.data) {
      setTrashedNotes(
        trashResponse.data.notes.map((note) => ({
          ...note,
          stateNote: "synced" as const,
        })),
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        archivedNotes,
        trashedNotes,
        addNote,
        updateNote,
        archiveNote,
        unarchiveNote,
        trashNote,
        deleteNoteById,
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
        syncPendingNotes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
