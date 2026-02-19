"use client";

import { useEffect, useRef, useState } from "react";

export const NoteInput = () => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleOpen = () => {
		setIsExpanded(true);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsExpanded(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	{
		console.log(isExpanded);
	}

	return (
		<section className="w-full max-w-xl mx-auto mt-5 border border-(--secondary-color) rounded-lg">
			<div
				ref={containerRef}
				className="bg-(--input-color) rounded-lg p-3 shadow-2xl">
				{isExpanded && (
					<input
						type="text"
						placeholder="Título"
						className="w-full outline-none mb-2 font-semibold text-xl"
					/>
				)}

				<textarea
					placeholder="Create a note..."
					className={`w-full outline-none resize-none ${!isExpanded ? "h-5" : "h-10"}`}
					onFocus={handleOpen}
				/>
			</div>
		</section>
	);
};
