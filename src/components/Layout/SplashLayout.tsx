import { LucideIcon } from "lucide-react";

export const SplashLayout = ({
	icon: Icon,
	text,
}: {
	icon: LucideIcon;
	text: string;
}) => {
	return (
		<section className="flex flex-col items-center pt-5">
			<Icon className="w-32 h-32 shrink-0" />
			<h1 className="text-xl pt-7">{text}</h1>
		</section>
	);
};
