import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import type { Note } from "../components/types/Note";

type Options = {
  toastOnSuccess?: boolean;
};

/**
 * Guest world: mutate local notes + optional success toast.
 * updateNote calls it with toastOnSuccess=false so the CALLER decides the
 * toast (keeps ImportancePicker silent when changing color).
 */

export function applyGuestNoteUpdate(
  setNotes: Dispatch<SetStateAction<Note[]>>,
  updater: (notes: Note[]) => Note[],
  successMessage: string,
  options: Options = {},
): string {
  setNotes(updater);
  const { toastOnSuccess = true } = options;
  if (toastOnSuccess) toast.success(successMessage);
  return successMessage;
}
