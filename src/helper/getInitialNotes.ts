import { Note } from "../components/types/Note";
import { LOCAL_STORAGE_KEYS } from "../constant";

export function getInitialNotes(): Note[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.NOTES);
    return raw ? (JSON.parse(raw) as Note[]) : [];
  } catch {
    return [];
  }
}
