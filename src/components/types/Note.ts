export type Note = {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  trashed: boolean;
};

export interface NoteCardProps {
  note: Note;
}
