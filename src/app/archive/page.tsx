import { SplashLayout } from "@/src/components/Layout/SplashLayout";
import { ArchiveIcon } from "lucide-react";

export default function Archive() {
	return (
		<section className="w-full flex flex-col flex-1 h-full">
			<div className="flex flex-1 items-center justify-center">
				<SplashLayout
					icon={ArchiveIcon}
					text={`Tus notas archivadas apareceran aquí`}
				/>
			</div>
		</section>
	);
}
