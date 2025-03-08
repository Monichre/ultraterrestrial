"use client";

import { createContext, useContext } from "react";
import type { ExplodingStackConfig } from "./types";

export interface ExplodingStackContextType {
	isExploded: boolean;
	toggleExploded: () => void;
	hoveredLayerIndex: number | null;
	setHoveredLayerIndex: (index: number | null) => void;
	config: ExplodingStackConfig;
}

export const ExplodingStackContext =
	createContext<ExplodingStackContextType | null>(null);

export const useExplodingStack = () => {
	const context = useContext(ExplodingStackContext);
	if (!context) {
		throw new Error("useExplodingStack must be used within an ExplodingStack");
	}
	return context;
};
