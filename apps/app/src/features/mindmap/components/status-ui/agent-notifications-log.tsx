"use client";

import { EllipsesScramble } from "@/components/animated/text-effect/text-scramble/ellipses-scramble";
import { TerminalIcon } from "@/components/icons";
import { Card } from "@/components/ui/card";
import { ICON_GREEN } from "@/utils";
import { AnimatePresence } from "framer-motion";

export const AgentNotificationsLog = () => {
	return (
		<AnimatePresence>
			<div className="w-[25vw] h-auto animate-[slide-in_0.3s_ease-out]">
				<div className="p-4 animate-[fade-in-up_0.4s_ease-out] flex flex-col gap-4 justify-start items-center align-middle">
					<Card className="bg-black/30 border-[#adf0dd]/30 backdrop-blur-sm p-4 w-full font-mono text-sm pointer-events-auto">
						<div className="text-[#adf0dd] space-y-1">
							<div className="opacity-90">[AI Interface]</div>
							<TerminalIcon stroke={ICON_GREEN} />
							<EllipsesScramble className="opacity-70">
								<span>Initializing Agents</span>
							</EllipsesScramble>

							<div className="opacity-80">{">"} Sync: In progress...</div>
						</div>
					</Card>
				</div>
			</div>
		</AnimatePresence>
	);
};
