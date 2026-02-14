import {
	Menu,
	Search,
	LayoutGrid,
	RotateCcw,
	Settings,
	UserRoundPen,
	StretchHorizontal,
} from "lucide-react";
import { IconButton } from "../common/IconButton";

export const Navbar = () => {
	return (
		<nav className="flex justify-between w-full py-2 px-2 border-b items-center">
			<div className="flex items-center">
				<IconButton icon={Menu} />
				{/* //Aquí ira el link describiendo el contexto */}
				<h1 className="text-2xl pl-2">Keep</h1>
			</div>
			<div className="relative w-100">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
				<input
					type="text"
					placeholder="Buscar"
					className="w-full pl-9 pr-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 "
				/>
			</div>
			<div className="flex gap-2">
				<IconButton icon={RotateCcw} />
				<IconButton icon={LayoutGrid} />
				<IconButton icon={Settings} />
			</div>
			<div>
				<IconButton icon={UserRoundPen} />
			</div>
		</nav>
	);
};
