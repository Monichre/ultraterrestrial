"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import {
	ExplodingStackContext,
	type ExplodingStackContextType,
	useExplodingStack,
} from "./exploding-stack-context";
import "./exploding-stack.css";
import type { ExplodingLayerProps, ExplodingStackProps } from "./types";

export function ExplodingStack({
	className,
	children,
	defaultExploded = false,
	rotationConfig = {
		x1: -20,
		y1: 35,
		x2: 30,
	},
	translationConfig = {
		step: 3,
		tx: 0.5,
		ty: -0.5,
	},
}: ExplodingStackProps) {
	const [isExploded, setIsExploded] = useState(defaultExploded);
	const [hoveredLayerIndex, setHoveredLayerIndex] = useState<number | null>(
		null,
	);

	const config = {
		rotation: {
			x1: rotationConfig.x1 ?? -20,
			y1: rotationConfig.y1 ?? 35,
			x2: rotationConfig.x2 ?? 30,
		},
		translation: {
			step: translationConfig.step ?? 3,
			tx: translationConfig.tx ?? 0.5,
			ty: translationConfig.ty ?? -0.5,
		},
	};

	const toggleExploded = () => setIsExploded((prev) => !prev);

	const contextValue: ExplodingStackContextType = {
		isExploded,
		toggleExploded,
		hoveredLayerIndex,
		setHoveredLayerIndex,
		config,
	};

	return (
		<ExplodingStackContext.Provider value={contextValue}>
			<div
				className={cn("relative w-full h-full", className)}
				style={{
					perspective: "1000px",
				}}
			>
				<motion.div
					className="w-full h-full transform-gpu"
					initial={{
						rotateX: 0,
						rotateY: 0,
						rotateZ: 0,
						translateZ: "100vmin",
					}}
					animate={{
						rotateX: isExploded ? config.rotation.x1 : 0,
						rotateY: isExploded ? config.rotation.y1 : 0,
						rotateZ: isExploded ? config.rotation.x2 : 0,
						translateZ: "100vmin",
					}}
					transition={{
						type: "spring",
						stiffness: 100,
						damping: 15,
					}}
					onClick={toggleExploded}
					style={{
						transformStyle: "preserve-3d",
					}}
				>
					{children}
				</motion.div>
			</div>
		</ExplodingStackContext.Provider>
	);
}

export function ExplodingLayer({
	className,
	children,
	depth = 0,
}: ExplodingLayerProps) {
	const { isExploded, hoveredLayerIndex, setHoveredLayerIndex, config } =
		useExplodingStack();
	const isHovered = hoveredLayerIndex === depth;

	return (
		<motion.div
			className={cn(
				"absolute inset-0 transform-gpu",
				isHovered && "z-10",
				isExploded && "exploded",
				className,
			)}
			style={
				{
					"--depth": `${depth * config.translation.step}rem`,
				} as React.CSSProperties
			}
			initial={{
				translateX: 0,
				translateY: 0,
				translateZ: 0,
			}}
			animate={{
				translateX: isExploded ? `${config.translation.tx}rem` : 0,
				translateY: isExploded ? `${config.translation.ty}rem` : 0,
				translateZ: isExploded ? `${depth * config.translation.step}rem` : 0,
				scale: isHovered && isExploded ? 1.05 : 1,
			}}
			transition={{
				type: "spring",
				stiffness: 100,
				damping: 15,
				delay: depth * 0.05,
			}}
			onMouseEnter={() => isExploded && setHoveredLayerIndex(depth)}
			onMouseLeave={() => setHoveredLayerIndex(null)}
		>
			<div className="w-full h-full transform-style-3d">{children}</div>
		</motion.div>
	);
}

// Add Layer as a subcomponent
ExplodingStack.Layer = ExplodingLayer;
