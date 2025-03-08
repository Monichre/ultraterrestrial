"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import type React from "react";
import { Suspense, useRef } from "react";
import type * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// Prop types
interface EarthProps {
	activeLocation: any;
}

interface MeshProps {
	activeLocation?: any;
}
// <ambientLight intensity={0.1} />
// <directionalLight intensity={1.5} position={[1, 0, -0.25]} />

// A reusable component for common lighting in the scene
const SceneLights = () => (
	<>
		<ambientLight intensity={0.01} />
		<directionalLight intensity={5} position={[1, 5, -2]} />
	</>
);

// Component for the rotating Earth mesh
const RotatingEarth: React.FC<MeshProps> = () => {
	const meshRef = useRef<THREE.Mesh>(null!);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.y += delta / 10;
		}
	});

	const [colorMap, normalMap, aoMap] = useLoader(TextureLoader, [
		"/assets/earth2/color.jpg",
		"/assets/earth2/normal.png",
		"/assets/earth2/occlusion.jpg",
	]) as THREE.Texture[];

	return (
		<motion.mesh ref={meshRef} scale={2.5} rotation-y={0.5}>
			<sphereGeometry args={[1, 32, 32]} />
			<meshStandardMaterial
				map={colorMap}
				normalMap={normalMap}
				aoMap={aoMap}
			/>
		</motion.mesh>
	);
};

// Main Earth component
export const Earth: React.FC<EarthProps> = () => (
	<div className="h-[60vh] w-[60vw] m-auto" id="earth-canvas">
		<Suspense
			fallback={
				<img
					alt="Earth placeholder"
					src="/assets/earth2/placeholder.png"
					width={1000}
					height={1000}
					loading="lazy"
				/>
			}
		>
			<Canvas style={{ height: "100%", width: "100%" }}>
				<SceneLights />
				<RotatingEarth />
			</Canvas>
		</Suspense>
	</div>
);

// Component for Earth at Night
interface EarthAtNightProps {
	meshRef?: React.Ref<THREE.Mesh>;
}

const EarthAtNight: React.FC<EarthAtNightProps> = () => {
	const [colorMap, normalMap, aoMap] = useLoader(TextureLoader, [
		"/8k_earth_nightmap.jpeg",
	]) as THREE.Texture[];

	return (
		<Suspense
			fallback={
				<img
					alt="Earth at night placeholder"
					src="/assets/earth2/placeholder.png"
					width={1000}
					height={1000}
					loading="lazy"
				/>
			}
		>
			<Canvas style={{ height: "100%", width: "100%" }}>
				<SceneLights />
				<motion.mesh ref={meshRef} scale={2.5}>
					<sphereGeometry args={[1, 32, 32]} />
					<meshStandardMaterial
						map={colorMap}
						normalMap={normalMap}
						aoMap={aoMap}
					/>
				</motion.mesh>
			</Canvas>
		</Suspense>
	);
};
