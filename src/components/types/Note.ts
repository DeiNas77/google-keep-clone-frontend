import { noteColorsImportant } from "./colors";

export type stateNoteSync = "synced" | "pending";

export type Note = {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  trashed: boolean;
  importance: noteColorsImportant;
  stateNote: stateNoteSync;
};

export interface GetNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  limit: number;
  q: string | null;
  totalPages: number;
}

export interface NoteCardProps {
  note: Note;
}
