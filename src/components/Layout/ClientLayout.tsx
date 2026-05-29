"use client";
import { AppProvider } from "../context/AppContext";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useAppContext } from "../context/AppContext";

const ClientLayoutInner = ({ children }: { children: React.ReactNode }) => {
	const { isGrid, toggleGrid, isSidebarOpen, toggleSidebar } = useAppContext();

	return (
		<section className="flex flex-col h-dvh">
			<Navbar
				handleOpen={toggleSidebar}
				handleGrid={isGrid}
				setHandleGrid={toggleGrid}
			/>
			<div className="flex flex-1 overflow-hidden">
				<Sidebar isOpen={isSidebarOpen} />
				<main className="flex-1 overflow-auto p-4">{children}</main>
			</div>
		</section>
	);
};

export const ClientLayout = ({ children }: { children: React.ReactNode }) => (
	<AppProvider>
		<ClientLayoutInner>{children}</ClientLayoutInner>
	</AppProvider>
);
