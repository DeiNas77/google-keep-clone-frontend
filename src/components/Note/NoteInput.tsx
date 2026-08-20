"use client";

import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";

export const NoteInput = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { addNote } = useAppContext();

  const handleOpen = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (title || content) {
          const newNote = {
            id: crypto.randomUUID(),
            title,
            content,
          };
          addNote(newNote);
          setTitle("");
          setContent("");
        }
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addNote, content, title]);

  return (
    <section className="w-full max-w-xl mx-auto mt-5 border border-(--secondary-color) rounded-lg">
      <div
        ref={containerRef}
        className="bg-(--input-color) rounded-lg p-3 shadow-2xl"
      >
        {isExpanded && (
          <input
            type="text"
            placeholder="Título"
            className="w-full outline-none mb-2 font-semibold text-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}

        <textarea
          placeholder="Create a note..."
          className={`w-full outline-none resize-none focus:ring-0 ${!isExpanded ? "h-5" : "h-10"}`}
          onFocus={handleOpen}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </section>
  );
};
