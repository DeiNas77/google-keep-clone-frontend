"use client";

import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { useRef } from "react";

export const NoteInput = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { addNote } = useAppContext();

  const handleOpen = () => {
    setIsExpanded(true);
  };

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      setTitle("");
      setContent("");
      setIsExpanded(false);
      return;
    }

    const newNote = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      archived: false,
      trashed: false,
    };
    addNote(newNote);
    setTitle("");
    setContent("");
    setIsExpanded(false);
  };

  useClickOutside(containerRef, handleSave);

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
          placeholder="Crear una nota..."
          className={`w-full outline-none resize-none focus:ring-0 ${!isExpanded ? "h-5" : "h-10"}`}
          onFocus={handleOpen}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </section>
  );
};
