"use client";

import { useState } from "react";
import { SplashLayout } from "../Layout/SplashLayout";
import { NoteInput } from "./NoteInput";
import { Lightbulb } from "lucide-react";

//TODO: en donde van las comillas en la linea 15, debe ir las Notas con su respectivo valor
//TODO: Tener en cuenta como se van a mostrar las notas siendo en flex o en grid

export const NoteClient = () => {
	const [notes, setNotes] = useState([]);
	return (
		<section className="w-full flex flex-col flex-1 h-full">
			<NoteInput />

			{notes.length > 0 ? (
				""
			) : (
				<div className="flex flex-1 items-center justify-center">
					<SplashLayout
						icon={Lightbulb}
						text={`Las notas que agregues aparecerán aquí`}
					/>
				</div>
			)}
		</section>
	);
};
