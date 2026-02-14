import { Lightbulb, Archive, Trash } from "lucide-react";
import { SidebarLink } from "../common/SidebarLink";

const iconsRender = [
	{ href: "/notes", text: "Notas", icon: Lightbulb },
	{ href: "/archive", text: "Archivar", icon: Archive },
	{ href: "/trash", text: "Papelera", icon: Trash },
];

//TODO: el w del aside debe estar en w-15 al estar cerrado. Y el hover debe rodearlo con un con un full al icon a la hora de cerrarse

export const Sidebar = () => {
	return (
		<aside className="w-63 overflow-auto border-r">
			<nav className="flex flex-col py-3">
				{iconsRender.map((items, index) => (
					<SidebarLink
						key={`sidebar-link-${index}`}
						href={items.href}
						text={items.text}
						icon={items.icon}
					/>
				))}
			</nav>
		</aside>
	);
};
