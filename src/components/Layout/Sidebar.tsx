import { Lightbulb, Archive, Trash } from "lucide-react";
import { SidebarLink } from "../common/SidebarLink";
import { SidebarProps } from "../types/NavbarProps";

const iconsRender = [
	{ href: "/notes", text: "Notas", icon: Lightbulb },
	{ href: "/archive", text: "Archivar", icon: Archive },
	{ href: "/trash", text: "Papelera", icon: Trash },
];

//TODO: el w del aside debe estar en w-15 al estar cerrado. Y el hover debe rodearlo con un con un full al icon a la hora de cerrarse

export const Sidebar = ({ isOpen }: SidebarProps) => {
	return (
		<aside
			className={`
				border-r transition-all duration-300
				${isOpen ? "w-64 overflow-auto" : "w-17 pl-1.5 overflow-hidden"}
			`}>
			<nav className="flex flex-col py-3 gap-1">
				{iconsRender.map((items, index) => (
					<SidebarLink
						key={`sidebar-link-${index}`}
						href={items.href}
						text={items.text}
						icon={items.icon}
						collapsed={!isOpen}
					/>
				))}
			</nav>
		</aside>
	);
};
