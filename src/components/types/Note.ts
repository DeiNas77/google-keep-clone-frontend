import { noteColorsImportant } from "./colors";

export type Note = {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  trashed: boolean;
  importance: noteColorsImportant;
};

export interface NoteCardProps {
  note: Note;
}
