"use client";

import * as THREE from "three";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/addons";
import { useLoader } from "@react-three/fiber";

// import { Bloom, EffectComposer, TiltShift2 } from "@react-three/postprocessing";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

useGLTF.preload("/assets/moon/moon.glb");

export const MoonScene = () => {
	const { nodes, materials }: any = useGLTF("/assets/moon/moon.glb");

	return (
		<mesh
			geometry={nodes["Sphere001_Material_#39_0"].geometry}
			material={materials.Material_39}
			material-normalScale={1.5}
			scale={0.04}
		/>
	);
};

export type MoonProps = {};

// Start of Selection
export const Moon = () => {
	return (
		<div
			className="h-[60vh] w-[60vw] absolute -translate-x-1/6 translate-y-1/4"
			id="moon-canvas"
		>
			{/* <color attach='background' args={['#101015']} /> */}
			<Canvas style={{ height: "100%", width: "100%" }}>
				<ambientLight intensity={0.01} />
				<directionalLight intensity={5} position={[1, 5, -2]} />

				<Suspense fallback={null}>
					{/* <PerspectiveCamera makeDefault position={[0, -0.5, 5]} fov={50} /> */}

					<MoonScene />
				</Suspense>
			</Canvas>
		</div>
	);
};
