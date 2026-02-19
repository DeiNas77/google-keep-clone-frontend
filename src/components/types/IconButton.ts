import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon: LucideIcon;
	classNameButton?: string;
	classNameIcon?: string;
};
