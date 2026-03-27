import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import type { ReactNode, RefObject } from "react";
import { useMemo } from "react";
import type { Group } from "three";

const deathStarUrl = new URL("../assets/3d/death_star.glb", import.meta.url)
	.href;

type SolarSystemProps = ThreeElements["group"] & {
	children?: ReactNode;
	systemRef?: RefObject<Group | null>;
};

export default function SolarSystem({
	children,
	systemRef,
	...props
}: SolarSystemProps) {
	const { scene } = useGLTF(deathStarUrl);
	const rotationSpeed = useMemo(() => 0.012, []);

	useFrame((_, delta) => {
		if (!systemRef?.current) return;
		systemRef.current.rotation.y += delta * rotationSpeed;
	});

	return (
		<group ref={systemRef} {...props}>
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<ringGeometry args={[7.8, 11.6, 72]} />
				<meshBasicMaterial color="#f59e0b" opacity={0.14} transparent />
			</mesh>
			<primitive object={scene} />
			{children}
		</group>
	);
}

useGLTF.preload(deathStarUrl);
