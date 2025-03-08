"use client";

import { cn } from "@/lib/utils";
import { Download, Radio, Rocket } from "lucide-react";

interface DialogOptionProps {
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
}

export function DialogOption({ icon, label, onClick }: DialogOptionProps) {
	return (
		<button
			type="button"
			className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-sm hover:bg-accent/50 transition-colors"
			onClick={onClick}
		>
			{icon}
			<span>{label}</span>
		</button>
	);
}

interface OptionsDialogProps {
	className?: string;
	onClose?: () => void;
	open?: boolean;
}

export function OptionsDialog({
	className,
	onClose,
	open = false,
}: OptionsDialogProps) {
	if (!open) return null;

	return (
		<div
			className={cn(
				"absolute right-0 top-0 z-50 w-36 rounded-md border bg-card shadow-md animate-in fade-in-0 zoom-in-95 duration-200",
				className,
			)}
		>
			<div className="py-1">
				<DialogOption
					icon={<Rocket className="h-4 w-4" />}
					label="Explore"
					onClick={() => {}}
				/>
				<div className="mx-1 my-1 border-t border-border" />
				<DialogOption
					icon={<Download className="h-4 w-4" />}
					label="Import"
					onClick={() => {}}
				/>
				<DialogOption
					icon={<Radio className="h-4 w-4" />}
					label="Broadcast"
					onClick={() => {}}
				/>
			</div>
		</div>
	);
}
