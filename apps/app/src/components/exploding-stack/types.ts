import type { ReactNode } from "react";

export interface ExplodingStackConfig {
	rotation: {
		x1: number;
		y1: number;
		x2: number;
	};
	translation: {
		step: number;
		tx: number;
		ty: number;
	};
}

export interface ExplodingStackProps {
	className?: string;
	children?: ReactNode;
	defaultExploded?: boolean;
	rotationConfig?: {
		x1?: number;
		y1?: number;
		x2?: number;
	};
	translationConfig?: {
		step?: number;
		tx?: number;
		ty?: number;
	};
}

export interface ExplodingLayerProps {
	className?: string;
	children?: ReactNode;
	depth?: number;
}

export interface ShadowProps {
	className?: string;
	type?: "main" | "table" | "status" | "dialog";
}

export interface TableHeaderProps {
	title: string;
	badgeText?: string;
	badgeIcon?: React.ReactNode;
	onOpenOptions?: () => void;
}

export interface SubscriberData {
	id: number;
	email: string;
	name: string;
	paid: boolean;
}

export interface SubscribersTableProps {
	data: SubscriberData[];
	className?: string;
}

export interface StatusItemProps {
	icon: React.ReactNode;
	label: string;
	value: string | React.ReactNode;
}

export interface StatusCardProps {
	className?: string;
	name?: string;
	domain?: string;
	count?: string;
	prepaid?: string;
}
