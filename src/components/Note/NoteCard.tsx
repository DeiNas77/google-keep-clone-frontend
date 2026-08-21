import { Note } from "../types/Note";
import { ArchiveIcon, EllipsisVertical } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const NoteCard = ({ note }: { note: Note }) => {
  const { archiveNote, unarchiveNote } = useAppContext();
  const { id, title, content, archived } = note;

  const handleArchive = (id: string) => {
    if (archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
  };

  return (
    <div className="border rounded-3xl min-h-16 wrap-break-word">
      <p className="text-2xl font-semibold line-clamp-2 px-4 pt-2 pb-1">
        {title}
      </p>
      <p
        className={`text-sm text-white line-clamp-6 px-4 pb-2 ${title && content ? "pt-2" : "pt-1"}`}
      >
        {content}
      </p>
      <div className="flex justify-end px-4 pt-2 pb-3 gap-2">
        <button
          className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
          onClick={() => handleArchive(id)}
        >
          <ArchiveIcon className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
          <EllipsisVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
