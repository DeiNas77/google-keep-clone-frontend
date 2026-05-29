// context/AppContext.tsx
"use client";
import { createContext, useContext, useState } from "react";
import type { Note } from "../types/Note";

interface AppContextProps {
	notes: Note[];
	addNote: (note: Note) => void;
	isGrid: boolean;
	toggleGrid: () => void;
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [isGrid, setIsGrid] = useState<boolean>(true);
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	const addNote = (note: Note) => setNotes((prev) => [note, ...prev]);
	const toggleGrid = () => setIsGrid((prev) => !prev);
	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

	return (
		<AppContext.Provider
			value={{
				notes,
				addNote,
				isGrid,
				toggleGrid,
				isSidebarOpen,
				toggleSidebar,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
