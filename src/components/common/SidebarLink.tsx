import Link from "next/link";
import { SidebarLinkProps } from "../types/SidebarLink";

export const SidebarLink = ({ href, text, icon: Icon }: SidebarLinkProps) => {
	return (
		<Link
			href={href}
			className="flex items-center gap-3 w-full pl-4 pr-4 py-3 hover:bg-gray-100 transition-colors">
			<Icon className="w-5 h-5 shrink-0" />
			<span className="pl-2.5">{text}</span>
		</Link>
	);
};
