import type { Meta, StoryObj } from "@storybook/react";
import { Gem } from "lucide-react";
import { ExplodingStack, Shadow } from "./";
import { StatusCard } from "./status";
import { SubscribersTable } from "./table";

// Mock data for demonstration
const mockData = [
	{
		id: 1,
		email: "john.doe@me.com",
		name: "John Doe",
		paid: true,
	},
	{
		id: 2,
		email: "emhoff3245@msn.com",
		name: "Emily Hoffmann",
		paid: true,
	},
	{
		id: 3,
		email: "michel@lewin.dev",
		name: "Michel Lewin",
		paid: false,
	},
	{
		id: 4,
		email: "grau@gmail.com",
		name: "Niels Grau",
		paid: true,
	},
	{
		id: 5,
		email: "tessa@pixelcraft.com",
		name: "Tessa Dietrich",
		paid: true,
	},
];

// Define the component metadata
const meta: Meta<typeof ExplodingStack> = {
	title: "UI/3D/ExplodingStack",
	component: ExplodingStack,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		defaultExploded: {
			control: "boolean",
			description: "Whether the stack should start in exploded state",
		},
		rotationConfig: {
			control: "object",
			description: "3D rotation angles for exploded view",
		},
		translationConfig: {
			control: "object",
			description: "Translation values for layers in exploded view",
		},
	},
	decorators: [
		(Story) => (
			<div className="min-h-[600px] w-full flex items-center justify-center p-10">
				<div className="w-[600px]">
					<Story />
				</div>
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof ExplodingStack>;

// Define the default story
export const Default: Story = {
	args: {
		defaultExploded: false,
		rotationConfig: {
			x1: -20,
			y1: 35,
			x2: 30,
		},
		translationConfig: {
			step: 3,
			tx: 0.5,
			ty: -0.5,
		},
	},
	render: (args) => (
		<ExplodingStack {...args}>
			{/* Main shadow */}
			<Shadow type="main" className="z-[-1] rounded-xl" />

			{/* Main layer */}
			<ExplodingStack.Layer depth={0} className="z-[1]">
				<div className="transform-gpu transform-style-3d">
					<Shadow type="table" />
					<div className="relative flex flex-col w-full rounded-xl border-2 border-primary/20 bg-card/90 backdrop-blur-sm p-4">
						<div className="flex items-center gap-2 mb-4">
							<Gem className="h-5 w-5 text-primary" />
							<h2 className="text-lg font-medium">the craft of ui</h2>
						</div>
						<div className="relative h-full w-full rounded-md border bg-muted/30">
							{/* This is where the table will be positioned */}
						</div>
					</div>
				</div>
			</ExplodingStack.Layer>

			{/* Table layer */}
			<ExplodingStack.Layer depth={1} className="z-[2]">
				<div className="transform-gpu transform-style-3d">
					<Shadow type="status" />
					<div className="p-4">
						<SubscribersTable data={mockData} />
					</div>
				</div>
			</ExplodingStack.Layer>

			{/* Status layer */}
			<ExplodingStack.Layer depth={2} className="z-[3]">
				<div className="transform-gpu transform-style-3d p-4 pt-16">
					<div className="relative">
						<Shadow type="dialog" className="opacity-50" />
						<StatusCard />
					</div>
				</div>
			</ExplodingStack.Layer>
		</ExplodingStack>
	),
};

// Exploded view story
export const Exploded: Story = {
	...Default,
	args: {
		...Default.args,
		defaultExploded: true,
	},
};

// Custom Configuration story
export const CustomConfig: Story = {
	...Default,
	args: {
		...Default.args,
		rotationConfig: {
			x1: -30,
			y1: 15,
			x2: 10,
		},
		translationConfig: {
			step: 5,
			tx: 1,
			ty: -1,
		},
	},
};
