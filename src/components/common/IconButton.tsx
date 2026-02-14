import type { IconButtonProps } from "../types/IconButton";

export const IconButton = ({
	icon: Icon,
	classNameButton = "",
	classNameIcon = "",
	...props
}: IconButtonProps) => {
	return (
		<button
			className={`p-2 rounded-full hover:bg-accent hover:cursor-pointer transition ${classNameButton}`}
			{...props}>
			<Icon className={`w-5 h-5 ${classNameIcon}`} />
		</button>
	);
};
