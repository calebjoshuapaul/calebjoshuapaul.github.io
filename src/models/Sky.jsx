import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import skyScene from "../assets/3d/sky.glb";
import { useFrame } from "@react-three/fiber";

function Sky({ isRotating, ...props }) {
	const sky = useGLTF(skyScene);
	const ref = useRef();

	useFrame((_, delta) => {
		if (isRotating) {
			ref.current.rotation.y += 0.15 * delta;
		}
	});

	return (
		<mesh ref={ref}>
			<primitive object={sky.scene} />
		</mesh>
	);
}

export default Sky;
