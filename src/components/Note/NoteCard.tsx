import { Note } from "../types/Note";

export const NoteCard = ({ note }: { note: Note }) => {
  const { title, content } = note;
  return (
    <div className="border p-6 rounded-3xl min-h-16 wrap-break-word">
      <p className="text-2xl font-semibold line-clamp-2">{title}</p>
      <p
        className={`text-sm text-white line-clamp-6 ${title && content ? "pt-3" : ""}`}
      >
        {content}
      </p>
    </div>
  );
};
