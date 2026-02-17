import Link from "next/link";
import { SidebarLinkProps } from "../types/SidebarLink";

export const SidebarLink = ({
	href,
	text,
	icon: Icon,
	collapsed = false,
}: SidebarLinkProps) => {
	return (
		<Link
			href={href}
			className={`
				flex items-center transition-all duration-300
				${
					collapsed
						? "flex items-center py-3 px-[.95rem] w-13 rounded-full hover:bg-gray-100"
						: "gap-3 px-[1.3rem] py-3 rounded-2xl w-full hover:bg-gray-100"
				}
			`}>
			<Icon className="w-5 h-5 shrink-0" />

			<span
				className={`
					pl-2.5 whitespace-nowrap overflow-hidden
					transition-all duration-300
					${collapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-xs"}
				`}>
				{text}
			</span>
		</Link>
	);
};
