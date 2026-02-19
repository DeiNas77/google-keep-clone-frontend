import { SplashLayout } from "@/src/components/Layout/SplashLayout";
import { Trash } from "lucide-react";

export default function Archive() {
	return (
		<section className="w-full flex flex-col flex-1 h-full">
			<h1 className="justify-center text-lg text-center">
				Las notas de la papelera se borran después de 7 días.
			</h1>
			<div className="flex flex-1 items-center justify-center">
				<SplashLayout icon={Trash} text={`No hay notas en la papelera`} />
			</div>
		</section>
	);
}
