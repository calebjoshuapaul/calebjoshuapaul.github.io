import { useGLTF } from "@react-three/drei";
import type { RefObject } from "react";
import type { Group } from "three";

const spaceShipUrl = new URL("../assets/3d/space_ship", import.meta.url).href;

type SpaceShipProps = {
	shipRef: RefObject<Group | null>;
	scale?: [number, number, number];
};

export default function SpaceShip({
	shipRef,
	scale = [0.03, 0.03, 0.03],
}: SpaceShipProps) {
	const { scene } = useGLTF(spaceShipUrl);

	return (
		<group ref={shipRef} scale={scale}>
			<primitive object={scene} />
		</group>
	);
}

useGLTF.preload(spaceShipUrl);
