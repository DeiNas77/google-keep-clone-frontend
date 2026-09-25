"use client";
import { AppProvider } from "../../components/context/AppContext";
import { SidebarDesktop, SidebarMobile } from "../../components/Layout/Sidebar";
import { Navbar } from "../../components/Layout/Navbar";
import { useAppContext } from "../../components/context/AppContext";

const MainLayoutInner = ({ children }: { children: React.ReactNode }) => {
  const { isGrid, toggleGrid, isSidebarOpen, toggleSidebar } = useAppContext();

  return (
    <section className="flex flex-col h-dvh">
      <Navbar
        handleOpen={toggleSidebar}
        handleGrid={isGrid}
        setHandleGrid={toggleGrid}
      />
      <div className="flex flex-1 overflow-hidden">
        <SidebarDesktop isOpen={isSidebarOpen} />
        <SidebarMobile isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </section>
  );
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <MainLayoutInner>{children}</MainLayoutInner>
    </AppProvider>
  );
}