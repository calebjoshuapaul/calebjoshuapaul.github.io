import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
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
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<ringGeometry args={[7.8, 11.6, 72]} />
				<meshBasicMaterial color="#f59e0b" opacity={0.14} transparent />
			</mesh>
			<primitive object={scene} />
		</group>
	);
}

useGLTF.preload(deathStarUrl);
