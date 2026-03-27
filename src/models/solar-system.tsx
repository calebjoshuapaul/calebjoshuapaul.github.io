import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { useMemo } from "react";

const deathStarUrl = new URL("../assets/3d/death_star.glb", import.meta.url)
	.href;

export default function SolarSystem(props: ThreeElements["group"]) {
	const { scene } = useGLTF(deathStarUrl);
	const rotationSpeed = useMemo(() => 0.12, []);

	useFrame((_, delta) => {
		scene.rotation.y += delta * rotationSpeed;
	});

	return (
		<group {...props}>
			<primitive object={scene} />
		</group>
	);
}

useGLTF.preload(deathStarUrl);
