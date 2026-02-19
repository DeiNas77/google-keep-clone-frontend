import { Lightbulb, Archive, Trash } from "lucide-react";
import { SidebarLink } from "../common/SidebarLink";
import { SidebarProps } from "../types/NavbarProps";

const iconsRender = [
	{ href: "/", text: "Notas", icon: Lightbulb },
	{ href: "/archive", text: "Archivar", icon: Archive },
	{ href: "/trash", text: "Papelera", icon: Trash },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
	return (
		<aside
			className={`
				 transition-all duration-200 border-r
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
