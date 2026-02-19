"use client";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useState } from "react";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOpen = () => setIsOpen((prev) => !prev);

	return (
		<div className="flex flex-col h-dvh">
			<Navbar handleOpen={handleOpen} />

			<div className="flex flex-1 overflow-hidden">
				<Sidebar isOpen={isOpen} />
				<main className="flex-1 overflow-auto p-4"> {children}</main>
			</div>
		</div>
	);
};
