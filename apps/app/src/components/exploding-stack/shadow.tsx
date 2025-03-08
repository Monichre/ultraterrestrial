"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useExplodingStack } from "./exploding-stack-context";
import type { ShadowProps } from "./types";

export function Shadow({ className, type = "main" }: ShadowProps) {
	const { isExploded, config } = useExplodingStack();

	const shadowVariants = {
		collapsed: {
			opacity: 1,
			scale: 0.999,
			x: 0,
			y: 0,
		},
		exploded: {
			opacity: 0.5,
			scale: 0.96,
			x: type !== "main" ? 0 : `${config.translation.tx}rem`,
			y: type !== "main" ? 0 : `${config.translation.ty}rem`,
		},
		hovered: {
			opacity: 0.2,
			scale: 0.94,
		},
	};

	return (
		<motion.div
			className={cn(
				"relative overflow-hidden transform-gpu",
				type === "main" && "shadow--main",
				type === "table" && "shadow--table",
				type === "status" && "shadow--status",
				type === "dialog" && "shadow--dialog",
				className,
			)}
			initial="collapsed"
			animate={isExploded ? "exploded" : "collapsed"}
			variants={shadowVariants}
			transition={{
				type: "spring",
				stiffness: 100,
				damping: 15,
			}}
		>
			<motion.div
				className="absolute inset-0 bg-black/30 dark:bg-black/70 rounded-lg"
				initial={{ scale: 1 }}
				whileHover={{ scale: 0.94 }}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 20,
				}}
			/>
		</motion.div>
	);
}
